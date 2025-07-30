import { Router } from "express";
import { RESPONSE_STATUS, VALIDATION_MESSAGES } from "@/constants";
import { asyncRoute } from "@/shared/utils";
import { compare } from "bcrypt-ts";
import { User } from "@/models/users";
import { validateAuthLogin } from "@/models/auth";
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
      id: _id,
      email,
      name,
    };

    const token = jwt.sign(userPayload, process.env.JWT_SECRET!);

    const payload = {
      user: userPayload,
      token,
    };

    res.status(RESPONSE_STATUS.SUCCESS).json(payload);
  })
);

export default router;
