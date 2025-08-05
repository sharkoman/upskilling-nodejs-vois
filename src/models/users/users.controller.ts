import { RESPONSE_STATUS, VALIDATION_MESSAGES } from "@/constants";
import { Request, Response } from "express";
import UserService from "./users.service";

class UserController {
  static async updateUserName(req: Request, res: Response) {
    const data = req.body;

    const user = await UserService.findByIdAndUpdate(req.params.id, data!);

    if (!user) {
      return res.status(RESPONSE_STATUS.NOT_FOUND).json({
        message: VALIDATION_MESSAGES.ITEM_NOT_FOUND,
      });
    }

    res.status(RESPONSE_STATUS.SUCCESS).json(user);
  }
}

export default UserController;
