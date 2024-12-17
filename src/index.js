import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";
import User from "./models/user.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

// Initialize Hardcoded SuperAdmin
const initializeSuperAdmin = async () => {
  try {
    const existingSuperAdmin = await User.findOne({ role: "superadmin" });
    if (!existingSuperAdmin) {
      const superAdmin = new User({
        name: "SuperAdmin",
        email: "superadmin@example.com",
        password: "superadmin123",
        role: "superadmin",
      });
      await superAdmin.save();
      console.log("SuperAdmin created!");
    } else {
      console.log("SuperAdmin already exists.");
    }
  } catch (error) {
    console.error("Error initializing SuperAdmin:", error.message);
  }
};

// Connect to DB and Start Server
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    initializeSuperAdmin();
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("DB Connection Error:", err));

  app.get('/', (req,res) => {
    res.send(`Hello world `);
  });