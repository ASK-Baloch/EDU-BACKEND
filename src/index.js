import mongoose from "mongoose";
import app from "./app.js";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  console.error("MONGO_URL is not defined in the environment variables");
  process.exit(1);
}

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

app.get('/', (req, res) => res.send('Hello from Edu Backend!'));