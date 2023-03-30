import express from "express";
import multer from "multer";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  getUserByUsername,
} from "../controllers/userController";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/username/:name", getUserByUsername);

router.post("/", upload.single("photo"), createUser);
router.get("/:id", getUser);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);

export default router;
