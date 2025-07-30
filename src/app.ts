import express from "express";
import { initAppRoutes } from "./startup/routes.startup";
import { initDb } from "./startup/db.startup";

const app = express();

// Init env
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("JWT_SECRET is not defined");
  process.exit(1);
}

// Check if MONGO_URI is defined
if (!MONGO_URI) {
  console.error("MONGO_URI is not defined");
  process.exit(1);
}

// Connect to database
initDb(MONGO_URI);

// Initialize routes and middlewares
initAppRoutes(app);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});