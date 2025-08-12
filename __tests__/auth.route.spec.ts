import { Request, Response } from "express";
import { compare, genSalt, hash } from "bcrypt-ts";
import { RESPONSE_STATUS, VALIDATION_MESSAGES } from "../src/constants";

import AuthController from "../src/models/auth/auth.controller";
import UserService from "../src/models/users/users.service";

// Mock dependencies
jest.mock("../src/models/users/users.service");
jest.mock("bcrypt-ts");
jest.mock("jsonwebtoken");

const mockUserService = UserService as jest.Mocked<typeof UserService>;
const mockBcrypt = { compare, genSalt, hash } as jest.Mocked<{
  compare: typeof compare;
  genSalt: typeof genSalt;
  hash: typeof hash;
}>;

describe("AuthController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockUser: any;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Mock user object
    mockUser = {
      _id: "mock-user-id",
      name: "Test User",
      email: "test@example.com",
      password: "hashedPassword123",
      toObject: jest.fn().mockReturnValue({
        _id: "mock-user-id",
        name: "Test User",
        email: "test@example.com",
        password: "hashedPassword123",
      }),
      generateAuthToken: jest.fn().mockReturnValue("mock-jwt-token"),
    };

    // Mock request and response objects
    mockRequest = {
      body: {},
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  // Login tests
  describe("login", () => {
    it("should return success response with user data and token when credentials are valid", async () => {
      // Arrange
      mockRequest.body = {
        email: "test@example.com",
        password: "password123",
      };

      mockUserService.findOne.mockResolvedValue(mockUser);
      (mockBcrypt.compare as jest.Mock).mockResolvedValue(true);

      // Act
      await AuthController.login(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(mockUserService.findOne).toHaveBeenCalledWith({
        email: "test@example.com",
      });
      expect(mockBcrypt.compare).toHaveBeenCalledWith(
        "password123",
        "hashedPassword123"
      );
      expect(mockUser.generateAuthToken).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith({
        user: {
          _id: "mock-user-id",
          name: "Test User",
          email: "test@example.com",
        },
        token: "mock-jwt-token",
      });
    });

    it("should return bad request when user is not found", async () => {
      // Arrange
      mockRequest.body = {
        email: "nonexistent@example.com",
        password: "password123",
      };

      mockUserService.findOne.mockResolvedValue(null);

      // Act
      await AuthController.login(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(mockUserService.findOne).toHaveBeenCalledWith({
        email: "nonexistent@example.com",
      });
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: VALIDATION_MESSAGES.USER_OR_PASSWORD_INVALID,
      });
    });

    it("should return bad request when password is invalid", async () => {
      // Arrange
      mockRequest.body = {
        email: "test@example.com",
        password: "wrongpassword",
      };

      mockUserService.findOne.mockResolvedValue(mockUser);
      (mockBcrypt.compare as jest.Mock).mockResolvedValue(false);

      // Act
      await AuthController.login(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(mockUserService.findOne).toHaveBeenCalledWith({
        email: "test@example.com",
      });
      expect(mockBcrypt.compare).toHaveBeenCalledWith(
        "wrongpassword",
        "hashedPassword123"
      );
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: VALIDATION_MESSAGES.USER_OR_PASSWORD_INVALID,
      });
    });
  });

  // Register tests
  describe("register", () => {
    it("should return success response with user data and token when registration is successful", async () => {
      // Arrange
      const newUserData = {
        name: "New User",
        email: "newuser@example.com",
        password: "password123",
      };

      mockRequest.body = newUserData;

      mockUserService.findOne.mockResolvedValue(null);
      (mockBcrypt.genSalt as jest.Mock).mockResolvedValue("mock-salt");
      (mockBcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword123");

      const createdUser = {
        ...mockUser,
        name: "New User",
        email: "newuser@example.com",
        toObject: jest.fn().mockReturnValue({
          _id: "mock-user-id",
          name: "New User",
          email: "newuser@example.com",
          password: "hashedPassword123",
        }),
      };
      mockUserService.createUser.mockResolvedValue(createdUser);

      // Act
      await AuthController.register(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(mockUserService.findOne).toHaveBeenCalledWith({
        email: "newuser@example.com",
      });
      expect(mockBcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(mockBcrypt.hash).toHaveBeenCalledWith("password123", "mock-salt");
      expect(mockUserService.createUser).toHaveBeenCalledWith({
        name: "New User",
        email: "newuser@example.com",
        password: "hashedPassword123",
      });
      expect(createdUser.generateAuthToken).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(RESPONSE_STATUS.CREATED);
      expect(mockResponse.json).toHaveBeenCalledWith({
        user: {
          _id: "mock-user-id",
          name: "New User",
          email: "newuser@example.com",
        },
        token: "mock-jwt-token",
      });
    });

    it("should return bad request when user already exists", async () => {
      // Arrange
      mockRequest.body = {
        name: "Existing User",
        email: "existing@example.com",
        password: "password123",
      };

      mockUserService.findOne.mockResolvedValue(mockUser);

      // Act
      await AuthController.register(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(mockUserService.findOne).toHaveBeenCalledWith({
        email: "existing@example.com",
      });
      expect(mockResponse.status).toHaveBeenCalledWith(
        RESPONSE_STATUS.BAD_REQUEST
      );
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: VALIDATION_MESSAGES.USER_ALREADY_EXISTS,
      });
    });
  });
});
