import express from "express";
import { jwtAuth } from "../controllers/authController";
import { getReTweets, reTweet } from "../controllers/reTweetController";

const router = express.Router();

router.use("*", jwtAuth);

router.post("/:id", reTweet);
router.get("/", getReTweets);

export default router;
