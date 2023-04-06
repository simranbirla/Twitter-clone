import { NextFunction, Request, Response } from "express";
import Tweet from "../model/tweetModel";
import Likes from "../model/likesModel";
import { IUser } from "../model/userModel";
import Retweet from "../model/retweetModel";

export const createTweet = async (req: Request, res: Response) => {
  try {
    const user = req.user as IUser;
    console.log(req.body);

    const tweet = await Tweet.create({ ...req.body, userId: user.id });

    if (req.body.parentId) {
      await Tweet.findByIdAndUpdate(req.body.parentId, {
        $push: { childIds: tweet._id },
      });
    }

    res.json({ status: 201, message: "Tweeted", data: tweet });
  } catch (err) {
    res.json({
      status: 500,
      message: "Something went wrong while creating the tweet",
      err,
    });
  }
};

export const getTweet = async (req: Request, res: Response) => {
  try {
    const tweet = await Tweet.findById(req.params.id).populate([
      {
        path: "userId",
        select: "name username -_id",
      },
      {
        path: "childIds",
        select: "text userId",
        populate: {
          path: "userId",
          select: "name username",
        },
      },
    ]);

    if (!tweet) {
      return res.json({ status: 404, message: "Tweet Not found" });
    }

    res.json({ status: 200, message: "Tweet found", data: tweet });
  } catch (err) {
    res.json({
      status: 500,
      message: "Something went wrong while creating the tweet",
      err,
    });
  }
};

export const deleteTweet = async (req: Request, res: Response) => {
  try {
    const tweet = await Tweet.findByIdAndDelete(req.params.id);
    if (!tweet) {
      return res.json({ status: 404, message: "Tweet Not found" });
    }

    const user = req.user as IUser;
    if (user.id !== tweet.userId) {
      return res.json({ status: 401, message: "Unauthorized" });
    }

    res.json({ status: 204, message: "Tweet deleted" });
  } catch (err) {
    res.json({
      status: 500,
      message: "Something went wrong while creating the tweet",
      err,
    });
  }
};

export const editTweet = async (req: Request, res: Response) => {
  try {
    req.body.edited = true;
    const tweet = await Tweet.findByIdAndUpdate(req.params.id, req.body);

    if (!tweet) {
      return res.json({ status: 404, message: "Tweet Not found" });
    }

    const user = req.user as IUser;
    if (user.id !== tweet.userId) {
      return res.json({ status: 401, message: "Unauthorized" });
    }

    res.json({ status: 200, message: "Tweet Updated", data: tweet });
  } catch (err) {
    res.json({
      status: 500,
      message: "Something went wrong while creating the tweet",
      err,
    });
  }
};

export const getTweets = async (req: Request, res: Response) => {
  try {
    const tweets = await Tweet.find();

    return res.json({ status: 200, data: tweets, message: "Tweets received" });
  } catch (err) {
    return res.json({ status: 500, message: "Something went wrong" });
  }
};

const getTweetsByUserId = async (userId: string, res: Response) => {
  try {
    const tweets = await Tweet.find({ userId });

    return res.json({ status: 200, data: tweets, message: "Tweets received" });
  } catch (err) {
    return res.json({ status: 500, message: "Something went wrong" });
  }
};

export const getUserTweets = async (req: Request, res: Response) => {
  await getTweetsByUserId(req.params.id, res);
};

export const getOwnTweets = async (req: Request, res: Response) => {
  const user = req.user as IUser;
  await getTweetsByUserId(user.id, res);
};

export const getLikedUsersOfTweet = async (req: Request, res: Response) => {
  try {
    const userLikes = await Likes.find({ tweetId: req.params.id }).populate(
      "userId",
      "-password"
    );

    const users = userLikes.map((userlike) => userlike.userId);

    return res.json({ status: 200, data: users });
  } catch (e) {
    return res.json({ status: 500, message: "Something went wrong" });
  }
};

export const getRetweetedUsersOfTweet = async (req: Request, res: Response) => {
  try {
    const userLikes = await Retweet.find({ tweetId: req.params.id }).populate(
      "userId",
      "-password"
    );

    const users = userLikes.map((userlike) => userlike.userId);

    return res.json({ status: 200, data: users });
  } catch (e) {
    return res.json({ status: 500, message: "Something went wrong" });
  }
};
