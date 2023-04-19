import express from "express";
import multer from "multer";
import { jwtAuth } from "../controllers/authController";
import {
  createUser,
  deleteUser,
  editUser,
  getAllUsers,
  getProfile,
  getUser,
  getUserByUsername,
} from "../controllers/userController";
import { upload } from "../utils/multerUpload";

const router = express.Router();

router.get("/username/:name", getUserByUsername);
router.get("/profile", jwtAuth, getProfile);

router.post("/", upload.single("photo"), createUser);
router.get("/:id", getUser);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);
router.patch("/", jwtAuth, editUser);

export default router;
