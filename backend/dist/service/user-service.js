"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("../model/user-model");
const user_validation_1 = require("../validation/user-validation");
const validation_1 = require("../validation/validation");
const response_error_1 = require("../error/response-error");
const database_1 = require("../application/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
class UserService {
    // Register User
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerRequest = validation_1.Validation.validate(user_validation_1.UserValidation.REGISTER, request);
            // Check if username already exists
            const isUsernameExists = yield database_1.prismaClient.user.count({
                where: {
                    username: registerRequest.username,
                },
            });
            if (isUsernameExists > 0) {
                throw new response_error_1.ResponseError(400, 'Username already exists');
            }
            // Hash password
            const hashedPassword = yield bcrypt_1.default.hash(registerRequest.password, 10);
            // Create new user with role default as 'user'
            const newUser = yield database_1.prismaClient.user.create({
                data: {
                    username: registerRequest.username,
                    password: hashedPassword,
                    name: registerRequest.name,
                    role: 'user', // Assign default role
                },
            });
            return (0, user_model_1.toUserResponse)(newUser);
        });
    }
    // Login User
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginRequest = validation_1.Validation.validate(user_validation_1.UserValidation.LOGIN, request);
            // Find user by username
            const user = yield database_1.prismaClient.user.findUnique({
                where: {
                    username: loginRequest.username,
                },
            });
            if (!user) {
                throw new response_error_1.ResponseError(401, 'Username or password is wrong');
            }
            // Validate password
            const isPasswordValid = yield bcrypt_1.default.compare(loginRequest.password, user.password);
            if (!isPasswordValid) {
                throw new response_error_1.ResponseError(401, 'Username or password is wrong');
            }
            // Generate and update token
            const updatedUser = yield database_1.prismaClient.user.update({
                where: {
                    username: user.username,
                },
                data: {
                    token: (0, uuid_1.v4)(),
                },
            });
            const response = (0, user_model_1.toUserResponse)(updatedUser);
            response.token = updatedUser.token;
            return response;
        });
    }
    // Get Current User
    static get(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    // Update User
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(user_validation_1.UserValidation.UPDATE, request);
            const updatedData = {};
            if (updateRequest.name) {
                updatedData.name = updateRequest.name;
            }
            if (updateRequest.password) {
                updatedData.password = yield bcrypt_1.default.hash(updateRequest.password, 10);
            }
            const updatedUser = yield database_1.prismaClient.user.update({
                where: {
                    username: user.username,
                },
                data: updatedData,
            });
            return (0, user_model_1.toUserResponse)(updatedUser);
        });
    }
    // Logout User
    static logout(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield database_1.prismaClient.user.update({
                where: {
                    username: user.username,
                },
                data: {
                    token: null,
                },
            });
            return (0, user_model_1.toUserResponse)(updatedUser);
        });
    }
}
exports.UserService = UserService;
