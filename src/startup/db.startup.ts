import mongoose from "mongoose";

export const initDb = (MONGO_URI: string) => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
};
