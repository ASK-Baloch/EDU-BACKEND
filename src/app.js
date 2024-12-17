import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userAuthenticationRoutes from "./routes/userauthentication.js";

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/superadmin", userAuthenticationRoutes);

export default app;
