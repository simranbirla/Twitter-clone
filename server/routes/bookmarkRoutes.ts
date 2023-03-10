import express from "express";
import passport from "passport";
import { jwtAuth } from "../controllers/authController";
import {
  bookmarkTweet,
  getBookmarkTweets,
} from "../controllers/bookmarkController";

const router = express.Router();

router.use("*", jwtAuth);

router.post("/:id", bookmarkTweet);
router.get("/", getBookmarkTweets);

export default router;
