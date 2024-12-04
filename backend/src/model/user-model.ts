import { Role, User } from '@prisma/client';

export type UserResponse = {
  username: string;
  name: string;
  token?: string;
  role?: Role;
};

export type CreateUserRequest = {
  username: string;
  name: string;
  password: string;
  role: Role;
};

export type LoginUserRequest = {
  username: string;
  password: string;
};

export type UpdateUserRequest = {
  name?: string;
  password?: string;
};

export function toUserResponse(user: User): UserResponse {
  return {
    name: user.name,
    username: user.username,
    role: user.role,
  };
}
