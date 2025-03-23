import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "./config";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(express.json());
app.use(cors());


// Routes
app.use("/api/auth", authRoutes);

// Connect to MongoDB and Start Server
mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(config.port, () =>
      console.log(`Server running on port ${config.port}`)
    );
  })
  .catch((error) => console.log("MongoDB connection error:", error));
