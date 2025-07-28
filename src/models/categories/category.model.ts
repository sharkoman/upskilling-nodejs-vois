import mongoose from "mongoose";
import { VALIDATION_MESSAGES, VALIDATION_NUMBERS } from "@/constants";
import { TCategory } from "./category.interface";

const categorySchema = new mongoose.Schema<TCategory>(
  {
    name: {
      type: String,
      minlength: [
        VALIDATION_NUMBERS.MIN_NAME_LENGTH,
        VALIDATION_MESSAGES.MIN_NAME_LENGTH,
      ],
      maxlength: [
        VALIDATION_NUMBERS.MAX_NAME_LENGTH,
        VALIDATION_MESSAGES.MAX_NAME_LENGTH,
      ],
      unique: true,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
