import { Router } from "express";
import { RESPONSE_STATUS, VALIDATION_MESSAGES } from "@/constants";
import { User, validateUser, validateUpdateUser } from "@/models/users";
import { asyncRoute } from "@/utils/async-route.util";
import { genSalt, hash } from "bcrypt-ts";

const router = Router();

router.post(
  "/",
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
        message: VALIDATION_MESSAGES.ITEM_ALREADY_EXISTS,
      });
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(data!.password, salt);

    const user = await User.create({
      ...data,
      password: hashedPassword,
    });

    res.status(RESPONSE_STATUS.CREATED).json(user);
  })
);

router.patch(
  "/:id",
  asyncRoute(async (req, res) => {
    const { error, success, data } = validateUpdateUser(req.body);

    if (!success) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        errors: error,
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name: data!.name },
      { new: true }
    );

    if (!user) {
      return res.status(RESPONSE_STATUS.NOT_FOUND).json({
        message: VALIDATION_MESSAGES.ITEM_NOT_FOUND,
      });
    }

    res.status(RESPONSE_STATUS.SUCCESS).json(user);
  })
);

export default router;
