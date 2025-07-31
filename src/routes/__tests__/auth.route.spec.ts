import request from "supertest";
import express from "express";
import { initAppRoutes } from "../../startup/routes.startup";
import { User, validateUser } from "@/models/users";

// Mock the User model
const mockUser = {
  _id: "507f1f77bcf86cd799439011",
  email: "test@example.com",
  password: "$2b$10$mockHashedPassword",
  name: "Test User",
  toObject: jest.fn().mockReturnValue({
    _id: "507f1f77bcf86cd799439011",
    email: "test@example.com",
    name: "Test User",
  }),
  generateAuthToken: jest.fn().mockReturnValue("mock.jwt.token"),
};

jest.mock("@/models/users", () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
  validateUser: jest.fn(),
}));

const app = express();

beforeAll(() => {
  initAppRoutes(app);
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Auth Routes", () => {
  describe("POST /api/auth/login", () => {
    it("should return 400 if email is not provided", async () => {
      const res = await request(app).post("/api/auth/login").send({}); // Empty body

      expect(res.status).toBe(400);
    });

    it("should return 400 if password is not provided", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@example.com" });

      expect(res.status).toBe(400);
    });

    it("should return 400 if user does not exist", async () => {
      // Mock User.findOne to return null (user not found)
      (User.findOne as jest.Mock).mockResolvedValue(null);

      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "nonexistent@example.com", password: "password123" });

      expect(res.status).toBe(400);
      expect(User.findOne).toHaveBeenCalledWith({
        email: "nonexistent@example.com",
      });
    });

    it("should return 200 if email and password are provided and valid", async () => {
      // Mock User.findOne to return a user
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);

      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@example.com", password: "password123" });

      // Log the response for debugging
      if (res.status !== 200) {
        console.log("Response status:", res.status);
        console.log("Response body:", res.body);
      }

      expect(res.status).toBe(200);
      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
    });
  });

  describe("POST /api/auth/register", () => {
    it("should return 400 if email is not provided", async () => {
      // Mock validateUser to return validation error
      (validateUser as jest.Mock).mockReturnValue({
        success: false,
        error: { email: "Email is required" },
      });

      const res = await request(app).post("/api/auth/register").send({}); // Empty body

      expect(res.status).toBe(400);
    });

    it("should return 400 if password is not provided", async () => {
      // Mock validateUser to return validation error
      (validateUser as jest.Mock).mockReturnValue({
        success: false,
        error: { password: "Password is required" },
      });

      const res = await request(app)
        .post("/api/auth/register")
        .send({ email: "test@example.com" });

      expect(res.status).toBe(400);
    });

    it("should return 400 if name is not provided", async () => {
      // Mock validateUser to return validation error
      (validateUser as jest.Mock).mockReturnValue({
        success: false,
        error: { name: "Name is required" },
      });

      const res = await request(app)
        .post("/api/auth/register")
        .send({ email: "test@example.com", password: "password123" });

      expect(res.status).toBe(400);
    });

    it("should return 400 if email is already in use", async () => {
      // Mock validateUser to return success
      (validateUser as jest.Mock).mockReturnValue({
        success: true,
        data: {
          email: "test@example.com",
          password: "password123",
          name: "Test User",
        },
      });

      // Mock User.findOne to return existing user
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);

      const res = await request(app).post("/api/auth/register").send({
        email: "test@example.com",
        password: "password123",
        name: "Test User",
      });

      expect(res.status).toBe(400);
    });

    it("should return 201 if email, password, and name are provided and valid", async () => {
      // Mock validateUser to return success
      (validateUser as jest.Mock).mockReturnValue({
        success: true,
        data: {
          email: "new@example.com",
          password: "password123",
          name: "New User",
        },
      });

      // Mock User.findOne to return null (user doesn't exist)
      (User.findOne as jest.Mock).mockResolvedValue(null);

      // Mock User.create to return new user
      (User.create as jest.Mock).mockResolvedValue(mockUser);

      const res = await request(app).post("/api/auth/register").send({
        email: "new@example.com",
        password: "password123",
        name: "New User",
      });

      expect(res.status).toBe(201);
      expect(User.create).toHaveBeenCalled();
    });
  });
});
