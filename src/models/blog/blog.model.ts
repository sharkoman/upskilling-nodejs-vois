import { VALIDATION_MESSAGES, VALIDATION_NUMBERS } from "@/constants";
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: [
        VALIDATION_NUMBERS.MIN_NAME_LENGTH,
        VALIDATION_MESSAGES.MIN_NAME_LENGTH,
      ],
      maxlength: [
        VALIDATION_NUMBERS.MAX_NAME_LENGTH,
        VALIDATION_MESSAGES.MAX_NAME_LENGTH,
      ],
      trim: true,
      required: true,
    },
    content: {
      type: String,
      minlength: [
        VALIDATION_NUMBERS.MIN_CONTENT_LENGTH,
        VALIDATION_MESSAGES.MIN_CONTENT_LENGTH,
      ],
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
