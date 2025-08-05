import { RESPONSE_STATUS, VALIDATION_MESSAGES } from "@/constants";
import { Request, Response } from "express";
import { validateUpdateUser } from ".";
import UserService from "./users.service";


class UserController {
  static updateUserName = async (req: Request, res: Response) => {
    const { error, success, data } = validateUpdateUser(req.body);

    if (!success) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        errors: error,
      });
    }

    const user = await UserService.findByIdAndUpdate(req.params.id, data!);

    if (!user) {
      return res.status(RESPONSE_STATUS.NOT_FOUND).json({
        message: VALIDATION_MESSAGES.ITEM_NOT_FOUND,
      });
    }

    res.status(RESPONSE_STATUS.SUCCESS).json(user);
  };
}

export default UserController;