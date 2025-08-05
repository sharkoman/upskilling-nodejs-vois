import request from "supertest";
import express from "express";
import authRoute from "../src/routes/auth.route";
import { validateUser, UserService } from "@/models/users";
import { validateAuthLogin } from "@/models/auth";
import { compare } from "bcrypt-ts";
import { errorMiddleware } from "@/middlewares";

// Mock the User model and UserService
const mockUser = {
  _id: "507f1f77bcf86cd799439011",
  email: "test@example.com",
  password: "$2b$10$mockHashedPassword",
  name: "Test User",
  toObject: jest.fn().mockReturnValue({
    _id: "507f1f77bcf86cd799439011",
    email: "test@example.com",
    password: "$2b$10$mockHashedPassword",
    name: "Test User",
  }),
  generateAuthToken: jest.fn().mockReturnValue("mock.jwt.token"),
};

jest.mock("@/models/users", () => ({
  validateUser: jest.fn(),
  UserService: {
    findOne: jest.fn(),
    createUser: jest.fn(),
  },
}));

jest.mock("@/models/auth", () => {
  const originalModule = jest.requireActual("@/models/auth");
  return {
    ...originalModule,
    validateAuthLogin: jest.fn(),
  };
});

const app = express();

beforeAll(() => {
  app.use(express.json());
  app.use("/api/auth", authRoute);
  app.use(errorMiddleware);
});

// Define mocked modules for proper typing
const mockedUserService = UserService as jest.Mocked<typeof UserService>;
const mockedValidateUser = validateUser as jest.Mock;
const mockedValidateAuthLogin = validateAuthLogin as jest.Mock;
const mockedCompare = compare as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
  // Reset bcrypt mock to default behavior
  mockedCompare.mockResolvedValue(true);
});

describe("Auth Routes", () => {
  describe("POST /api/auth/login", () => {
    it("should return 400 if validation fails for missing email", async () => {
      // Mock validation to fail
      mockedValidateAuthLogin.mockReturnValue({
        success: false,
        error: { email: "Email is required" },
      });

      const res = await request(app).post("/api/auth/login").send({
        password: "password123",
      });

      expect(res.status).toBe(400);
    });

    it("should return 400 if validation fails for missing password", async () => {
      // Mock validation to fail
      mockedValidateAuthLogin.mockReturnValue({
        success: false,
        error: { password: "Password is required" },
      });

      const res = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
      });

      expect(res.status).toBe(400);
    });

    it("should return 400 if user does not exist", async () => {
      // Mock validation to succeed
      mockedValidateAuthLogin.mockReturnValue({
        success: true,
        data: { email: "nonexistent@example.com", password: "password123" },
      });

      // Mock UserService.findOne to return null (user not found)
      mockedUserService.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "nonexistent@example.com", password: "password123" });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "User or password invalid");
    });

    it("should return 400 if password is invalid", async () => {
      // Mock validation to succeed
      mockedValidateAuthLogin.mockReturnValue({
        success: true,
        data: { email: "test@example.com", password: "wrongpassword" },
      });

      // Mock UserService.findOne to return a user
      mockedUserService.findOne.mockResolvedValue(mockUser);

      // Mock bcrypt compare to return false (invalid password)
      mockedCompare.mockResolvedValue(false);

      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@example.com", password: "wrongpassword" });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "User or password invalid");
    });

    it("should return 200 with user data and token if credentials are valid", async () => {
      // Mock validation to succeed
      mockedValidateAuthLogin.mockReturnValue({
        success: true,
        data: { email: "test@example.com", password: "password123" },
      });

      // Mock UserService.findOne to return a user
      mockedUserService.findOne.mockResolvedValue(mockUser);

      // Mock bcrypt compare to return true (valid password)
      mockedCompare.mockResolvedValue(true);

      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@example.com", password: "password123" });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("user");
      expect(res.body).toHaveProperty("token");
      expect(res.body.user).toHaveProperty("email", "test@example.com");
      expect(res.body.user).toHaveProperty("name", "Test User");
      expect(res.body.user).not.toHaveProperty("password");
      expect(res.body.token).toBe("mock.jwt.token");
    });
  });

  describe("POST /api/auth/register", () => {
    it("should return 400 if validation fails for missing email", async () => {
      // Mock validateUser to return validation error
      mockedValidateUser.mockReturnValue({
        success: false,
        error: { email: "Invalid Email Address" },
      });

      const res = await request(app).post("/api/auth/register").send({
        password: "password123",
        name: "Test User",
      });

      expect(res.status).toBe(400);
    });

    it("should return 400 if validation fails for missing password", async () => {
      // Mock validateUser to return validation error
      mockedValidateUser.mockReturnValue({
        success: false,
        error: { password: "Password must be at least 8 characters long" },
      });

      const res = await request(app).post("/api/auth/register").send({
        email: "test@example.com",
        name: "Test User",
      });

      expect(res.status).toBe(400);
    });

    it("should return 400 if validation fails for missing name", async () => {
      // Mock validateUser to return validation error
      mockedValidateUser.mockReturnValue({
        success: false,
        error: { name: "Name must be at least 2 characters long" },
      });

      const res = await request(app).post("/api/auth/register").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(res.status).toBe(400);
    });

    it("should return 400 if email is already in use", async () => {
      // Mock validateUser to return success
      mockedValidateUser.mockReturnValue({
        success: true,
        data: {
          email: "test@example.com",
          password: "password123",
          name: "Test User",
        },
      });

      // Mock UserService.findOne to return existing user
      mockedUserService.findOne.mockResolvedValue(mockUser);

      const res = await request(app).post("/api/auth/register").send({
        email: "test@example.com",
        password: "password123",
        name: "Test User",
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "User already exists, please login");
    });

    it("should return 201 with user data and token if registration is successful", async () => {
      const newUser = {
        ...mockUser,
        email: "new@example.com",
        name: "New User",
        toObject: jest.fn().mockReturnValue({
          _id: "507f1f77bcf86cd799439012",
          email: "new@example.com",
          name: "New User",
        }),
      };

      // Mock validateUser to return success
      mockedValidateUser.mockReturnValue({
        success: true,
        data: {
          email: "new@example.com",
          password: "password123",
          name: "New User",
        },
      });

      // Mock UserService.findOne to return null (user doesn't exist)
      mockedUserService.findOne.mockResolvedValue(null);

      // Mock UserService.createUser to return new user
      mockedUserService.createUser.mockResolvedValue(newUser);

      const res = await request(app).post("/api/auth/register").send({
        email: "new@example.com",
        password: "password123",
        name: "New User",
      });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("user");
      expect(res.body).toHaveProperty("token");
      expect(res.body.user).toHaveProperty("email", "new@example.com");
      expect(res.body.user).toHaveProperty("name", "New User");
      expect(res.body.user).not.toHaveProperty("password");
      expect(res.body.token).toBe("mock.jwt.token");
      expect(mockedUserService.createUser).toHaveBeenCalled();
    });
  });
});
