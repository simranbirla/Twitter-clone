import express from "express";
import passport from "passport";
import { jwtAuth } from "../controllers/authController";
import { getLikedTweets, likeTweet } from "../controllers/likeController";

const router = express.Router();

router.use("*", jwtAuth);

router.post("/:id", likeTweet);
router.get("/", getLikedTweets);

export default router;
