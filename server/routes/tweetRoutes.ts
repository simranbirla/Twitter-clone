import express from "express";
import passport from "passport";
import { jwtAuth } from "../controllers/authController";
import {
  createTweet,
  deleteTweet,
  editTweet,
  getTweet,
  getTweets,
} from "../controllers/tweetController";

const router = express.Router();

router.route("/").get(getTweets).post(jwtAuth, createTweet);

router.use("*", jwtAuth);

router.route("/:id").get(getTweet).patch(editTweet).delete(deleteTweet);

export default router;
