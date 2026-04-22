import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import detectRoutes from "./routes/detectRoutes.js";

/*
Load environment variables
*/
dotenv.config();

const app = express();

/*
Middleware
*/
app.use(cors());
app.use(express.json());

/*
Routes
*/
app.use("/detect", detectRoutes);

/*
Health check route
*/
app.get("/", (req, res) => {
  res.json({ message: "AI Image Detection API running" });
});

/*
Server start
*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
