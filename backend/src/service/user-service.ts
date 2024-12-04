import { CreateUserRequest, LoginUserRequest, toUserResponse, UpdateUserRequest, UserResponse } from '../model/user-model';
import { UserValidation } from '../validation/user-validation';
import { Validation } from '../validation/validation';
import { ResponseError } from '../error/response-error';
import { prismaClient } from '../application/database';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { User } from '@prisma/client';

export class UserService {
  // Register User
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(UserValidation.REGISTER, request);

    // Check if username already exists
    const isUsernameExists = await prismaClient.user.count({
      where: {
        username: registerRequest.username,
      },
    });

    if (isUsernameExists > 0) {
      throw new ResponseError(400, 'Username already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerRequest.password, 10);

    // Create new user with role default as 'user'
    const newUser = await prismaClient.user.create({
      data: {
        username: registerRequest.username,
        password: hashedPassword,
        name: registerRequest.name,
        role: 'user', // Assign default role
      },
    });

    return toUserResponse(newUser);
  }

  // Login User
  static async login(request: LoginUserRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    // Find user by username
    const user = await prismaClient.user.findUnique({
      where: {
        username: loginRequest.username,
      },
    });

    if (!user) {
      throw new ResponseError(401, 'Username or password is wrong');
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
      throw new ResponseError(401, 'Username or password is wrong');
    }

    // Generate and update token
    const updatedUser = await prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: {
        token: uuid(),
      },
    });

    const response = toUserResponse(updatedUser);
    response.token = updatedUser.token!;
    return response;
  }

  // Get Current User
  static async get(user: User): Promise<UserResponse> {
    return toUserResponse(user);
  }

  // Update User
  static async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);

    const updatedData: Partial<User> = {};

    if (updateRequest.name) {
      updatedData.name = updateRequest.name;
    }

    if (updateRequest.password) {
      updatedData.password = await bcrypt.hash(updateRequest.password, 10);
    }

    const updatedUser = await prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: updatedData,
    });

    return toUserResponse(updatedUser);
  }

  // Logout User
  static async logout(user: User): Promise<UserResponse> {
    const updatedUser = await prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: {
        token: null,
      },
    });

    return toUserResponse(updatedUser);
  }
}
