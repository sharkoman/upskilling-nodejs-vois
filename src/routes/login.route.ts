import { Router } from "express";
import { validateAuth } from "@/models/auth";
import { RESPONSE_STATUS, VALIDATION_MESSAGES } from "@/constants";
import { asyncRoute } from "@/shared/utils";
import { compare } from "bcrypt-ts";
import { User } from "@/models/users";

const router = Router();

router.post(
  "/",
  asyncRoute(async (req, res) => {
    const { error, success, data } = validateAuth(req.body);

    if (!success) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        errors: error,
      });
    }

    const user = await User.findOne({ email: data?.email });

    if (!user) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        message: VALIDATION_MESSAGES.ITEM_NOT_FOUND,
      });
    }

    const isPasswordValid = await compare(data!.password, user.password);

    if (!isPasswordValid) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        message: VALIDATION_MESSAGES.INVALID_PASSWORD,
      });
    }

    // TODO: Generate token
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  })
);

export default router;
