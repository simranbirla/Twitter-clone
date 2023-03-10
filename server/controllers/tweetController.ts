import { NextFunction, Request, Response } from "express";
import Tweet from "../model/tweetModel";
import { IUser } from "../model/userModel";

export const createTweet = async (req: Request, res: Response) => {
  try {
    const user = req.user as IUser;

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
