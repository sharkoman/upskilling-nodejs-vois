import { Router } from "express";
import { RESPONSE_STATUS, VALIDATION_MESSAGES } from "@/constants";
import { User, validateUpdateUser } from "@/models/users";
import { asyncRoute } from "@/utils/async-route.util";

const router = Router();

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
