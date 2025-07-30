import { Router } from "express";
import { RESPONSE_STATUS, VALIDATION_MESSAGES } from "@/constants";
import { asyncRoute } from "@/utils";
import { compare, genSalt, hash } from "bcrypt-ts";
import { User, validateUser } from "@/models/users";
import { validateAuthLogin, IAuthLoginResponse } from "@/models/auth";
import jwt from "jsonwebtoken";

const router = Router();

router.get(
  "/login",
  asyncRoute(async (req, res) => {
    const { error, success, data } = validateAuthLogin(req.body);

    if (!success) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        errors: error,
      });
    }

    const user = await User.findOne({ email: data?.email });

    if (!user) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        message: VALIDATION_MESSAGES.USER_OR_PASSWORD_INVALID,
      });
    }

    const isPasswordValid = await compare(data!.password, user.password);

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

    const token = jwt.sign(userPayload, process.env.JWT_SECRET!);

    const payload: IAuthLoginResponse = {
      user: userPayload,
      token,
    };

    res.status(RESPONSE_STATUS.SUCCESS).json(payload);
  })
);

router.post(
  "/register",
  asyncRoute(async (req, res) => {
    const { error, success, data } = validateUser(req.body);

    if (!success) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        errors: error,
      });
    }

    const isUserExists = await User.findOne({ email: data!.email });

    if (isUserExists) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        message: VALIDATION_MESSAGES.USER_ALREADY_EXISTS,
      });
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(data!.password, salt);

    const user = await User.create({
      ...data,
      password: hashedPassword,
    });

    // Create login token after user is created.
    const { name, email, _id } = user.toObject();

    const userPayload = {
      _id,
      name,
      email,
    };

    const token = jwt.sign(userPayload, process.env.JWT_SECRET!);

    const payload: IAuthLoginResponse = {
      user: userPayload,
      token,
    };

    res.status(RESPONSE_STATUS.CREATED).json(payload);
  })
);

export default router;
