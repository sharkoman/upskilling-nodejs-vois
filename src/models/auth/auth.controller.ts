import { RESPONSE_STATUS, VALIDATION_MESSAGES } from "@/constants";
import { compare, genSalt, hash } from "bcrypt-ts";
import { IAuthLoginResponse } from "./auth.interface";
import { Request, Response } from "express";
import { TUser } from "@/models/users";
import {UserService} from "@/models/users";

class AuthController {
  static async login(req: Request, res: Response) {
    const data = req.body;

    const user = await UserService.findOne({ email: data?.email });

    if (!user) {
      res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        message: VALIDATION_MESSAGES.USER_OR_PASSWORD_INVALID,
      });

      return {
        message: VALIDATION_MESSAGES.USER_OR_PASSWORD_INVALID,
        status: RESPONSE_STATUS.BAD_REQUEST,
      };
    }

    const { password } = user.toObject();

    const isPasswordValid = await compare(data!.password, password);

    if (!isPasswordValid) {
      res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        message: VALIDATION_MESSAGES.USER_OR_PASSWORD_INVALID,
      });

      return {
        message: VALIDATION_MESSAGES.USER_OR_PASSWORD_INVALID,
        status: RESPONSE_STATUS.BAD_REQUEST,
      };
    }

    const { name, email, _id } = user.toObject();

    const userPayload = {
      _id,
      email,
      name,
    };

    const token = user.generateAuthToken();

    const payload: IAuthLoginResponse = {
      user: userPayload,
      token,
    };

    res.status(RESPONSE_STATUS.SUCCESS).json(payload);
    
    // Return the payload for testing purposes
    return payload;
  }

  static async register(req: Request, res: Response) {
    const data = req.body as TUser;

    const isUserExists = await UserService.findOne({ email: data.email });

    if (isUserExists) {
      res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        message: VALIDATION_MESSAGES.USER_ALREADY_EXISTS,
      });

      return {
        message: VALIDATION_MESSAGES.USER_ALREADY_EXISTS,
        status: RESPONSE_STATUS.BAD_REQUEST,
      };
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(data.password, salt);

    const createdUser = await UserService.createUser({
      ...data,
      password: hashedPassword,
    });

    const { _id, name, email } = createdUser.toObject();

    const userPayload = {
      _id,
      name,
      email,
    };

    const token = createdUser.generateAuthToken();

    const payload: IAuthLoginResponse = {
      user: userPayload,
      token,
    };

    res.status(RESPONSE_STATUS.CREATED).json(payload);
    
    // Return the payload for testing purposes
    return payload;
  }
}

export default AuthController;
