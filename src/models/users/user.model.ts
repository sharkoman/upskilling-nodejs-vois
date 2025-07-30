import mongoose from "mongoose";
import { IUserDocument } from "./user.interface";
import { VALIDATION_MESSAGES, VALIDATION_NUMBERS } from "@/constants";
import { emailValidator, passwordValidator } from "@/utils";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema<IUserDocument>(
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
      validate: {
        validator: passwordValidator,
        message: VALIDATION_MESSAGES.INVALID_PASSWORD,
      },
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    methods: {
      generateAuthToken: function () {
        return jwt.sign({ _id: this._id }, process.env.JWT_SECRET as string);
      },
    },
  }
);

const User = mongoose.model<IUserDocument>("User", userSchema);

export default User;
