import { RESPONSE_STATUS, VALIDATION_MESSAGES } from "@/constants";
import { compare, genSalt, hash } from "bcrypt-ts";
import { IAuthLoginResponse } from "./auth.interface";
import { validateAuthLogin } from "./auth.validator";
import { Request, Response } from "express";
import UserService from "../users/users.service";
import { validateUser } from "../users/user.validator";

class AuthController {
  static async login(req: Request, res: Response) {
    const { error, success, data } = validateAuthLogin(req.body);

    if (!success) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        errors: error,
      });
    }

    const user = await UserService.findOne({ email: data?.email }).select(
      "password"
    );

    if (!user) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        message: VALIDATION_MESSAGES.USER_OR_PASSWORD_INVALID,
      });
    }

    const { password, generateAuthToken } = user.toObject();

    const isPasswordValid = await compare(data!.password, password);

    if (!isPasswordValid) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        message: VALIDATION_MESSAGES.USER_OR_PASSWORD_INVALID,
      });
    }

    const { name, email, _id } = user.toObject();

    const userPayload = {
      _id,
      email,
      name,
    };

    const token = generateAuthToken();

    const payload: IAuthLoginResponse = {
      user: userPayload,
      token,
    };

    res.status(RESPONSE_STATUS.SUCCESS).json(payload);
  }

  static async register(req: Request, res: Response) {
    const { error, success, data } = validateUser(req.body);

    if (!success) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        errors: error,
      });
    }

    const isUserExists = await UserService.findOne({ email: data!.email });

    if (isUserExists) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        message: VALIDATION_MESSAGES.USER_ALREADY_EXISTS,
      });
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(data!.password, salt);

    const { _id, name, email, generateAuthToken } =
      await UserService.createUser({
        ...data!,
        password: hashedPassword,
      });

    const userPayload = {
      _id,
      name,
      email,
    };

    const token = generateAuthToken();

    const payload: IAuthLoginResponse = {
      user: userPayload,
      token,
    };

    res.status(RESPONSE_STATUS.CREATED).json(payload);
  }
}

export default AuthController;
