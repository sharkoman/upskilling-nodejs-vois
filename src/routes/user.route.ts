import { Router } from "express";
import { RESPONSE_STATUS, VALIDATION_MESSAGES } from "@/constants";
import { User, validateUser } from "@/models/users";
import { asyncRoute } from "@/utils/async-route.util";

const router = Router();

router.get(
  "/",
  asyncRoute(async (_req, res) => {
    res.send("Users...");
  })
);

router.post(
  "/",
  asyncRoute(async (req, res) => {
    const { error, success, data } = validateUser(req.body);

    if (!success) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        errors: error,
      });
    }

    const isUserExists = await User.findOne({ email: data?.email });

    if (isUserExists) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        message: VALIDATION_MESSAGES.ITEM_ALREADY_EXISTS,
      });
    }

    const user = await User.create(data);

    res.status(RESPONSE_STATUS.CREATED).json(user);
  })
);

router.put(
  "/:id",
  asyncRoute(async (req, res) => {
    res.send("Update User...");
  })
);

export default router;
