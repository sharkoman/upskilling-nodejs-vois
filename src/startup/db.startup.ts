import mongoose from "mongoose";


// transform _id to id and delete __v in JSON responses
mongoose.set('toJSON', {
  transform: function(doc, ret: Record<string, unknown>) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

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
