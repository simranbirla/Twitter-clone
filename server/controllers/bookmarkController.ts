import { Request, Response } from "express";
import Bookmark from "../model/bookmarkModel";
import Tweet from "../model/tweetModel";
import { IUser } from "../model/userModel";

export const bookmarkTweet = async (req: Request, res: Response) => {
  try {
    const user = req.user as IUser;

    const tweet = await Bookmark.findOne({
      tweetId: req.params.id,
      userId: user.id,
    });

    if (tweet) {
      await Bookmark.deleteOne({ tweetId: req.params.id, userId: user.id });
      return res.json({ message: "Tweet Unsaved", status: 200 });
    }
    await Bookmark.create({
      tweetId: req.params.id,
      userId: user.id,
    });

    return res.json({ message: "Tweet saved", status: 200 });
  } catch (err) {
    return res.json({ message: "Something went wrong", status: 500, err });
  }
};

export const getBookmarkTweets = async (req: Request, res: Response) => {
  const user = req.user as IUser;

  const bookmarkedTweets = await Bookmark.find({ userId: user.id })
    .populate("tweetId")
    .exec();

  return res.json({ message: "Bookmarked tweets", data: bookmarkedTweets });
};
