import express from "express";
import { jwtAuth } from "../controllers/authController";
import {
  createTweet,
  deleteTweet,
  editTweet,
  getLikedUsersOfTweet,
  getOwnTweets,
  getRetweetedUsersOfTweet,
  getTweet,
  getTweets,
  getUserTweets,
} from "../controllers/tweetController";

const router = express.Router();

router.route("/").get(getTweets).post(jwtAuth, createTweet);
router.use("*", jwtAuth);

router.get("/user", getOwnTweets);
router.get("/user/:id", getUserTweets);

router.route("/:id").get(getTweet).patch(editTweet).delete(deleteTweet);
router.get("/:id/likes", getLikedUsersOfTweet);
router.get("/:id/retweets", getRetweetedUsersOfTweet);

export default router;
