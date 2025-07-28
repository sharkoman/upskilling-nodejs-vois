import mongoose from "mongoose";
import { TUser } from "./user.interface";
import { VALIDATION_MESSAGES, VALIDATION_NUMBERS } from "@/constants";
import { emailValidator } from "@/shared/utils";

const userSchema = new mongoose.Schema<TUser>(
  {
    name: {
      type: String,
      trim: true,
      minlength: [
        VALIDATION_NUMBERS.MIN_NAME_LENGTH,
        VALIDATION_MESSAGES.MIN_NAME_LENGTH,
      ],
      maxlength: [
        VALIDATION_NUMBERS.MAX_NAME_LENGTH,
        VALIDATION_MESSAGES.MAX_NAME_LENGTH,
      ],
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
      validate: {
        validator: emailValidator,
        message: VALIDATION_MESSAGES.INVALID_EMAIL_ADDRESS,
      },
    },
    password: {
      type: String,
      minlength: [
        VALIDATION_NUMBERS.MIN_PASSWORD_LENGTH,
        VALIDATION_MESSAGES.MIN_PASSWORD_LENGTH,
      ],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
