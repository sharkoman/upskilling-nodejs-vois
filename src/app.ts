import express from "express";
import categoryRoute from "./routes/category.route";
import blogRoute from "./routes/blog.route";

const PORT = process.env.PORT || 3000;

const app = express();

app.use("/categories", categoryRoute);
app.use("/blogs", blogRoute);

app.get("/", (_req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});