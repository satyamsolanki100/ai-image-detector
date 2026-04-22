import express from "express";
import multer from "multer";
import path from "path";
import { detectImage } from "../controllers/detectController.js";

const router = express.Router();

/*
MULTER STORAGE CONFIG
Images will be saved inside /uploads
*/

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  },
});

/*
FILE FILTER
Only allow jpg and png
*/

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png"];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG and PNG images are allowed"), false);
  }
};

/*
UPLOAD CONFIG
Max size = 5MB
*/

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

/*
POST /detect
*/

router.post("/", upload.single("image"), detectImage);

export default router;
