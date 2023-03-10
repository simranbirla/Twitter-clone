import { Request, Response } from "express";
import Retweet from "../model/retweetModel";
import Tweet from "../model/tweetModel";
import { IUser } from "../model/userModel";

export const reTweet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const tweet = await Tweet.findById(req.params.id);

    if (!tweet) {
      return res.json({ status: 404, message: "Tweet Not found" });
    }

    const user = req.user as IUser;
    const retweet = await Retweet.findOne({ tweetId: id, userId: user.id });

    if (retweet) {
      await Retweet.findOneAndDelete({ tweetId: id, userId: user.id });
      const tweet = await Tweet.findByIdAndUpdate(
        id,
        { $inc: { retweets: -1 } },
        { new: true }
      );

      return res.json({
        status: 200,
        message: "Tweet un- retweeted",
        data: tweet,
      });
    }

    await Retweet.create({ tweetId: id, userId: user.id });
    const reTweet = await Tweet.findByIdAndUpdate(
      id,
      { $inc: { retweets: 1 } },
      { new: true }
    );

    res.json({ status: 200, message: "Retweeted", data: reTweet });
  } catch (err) {
    res.json({
      status: 500,
      message: "Something went wrong while creating the tweet",
      err,
    });
  }
};

export const getReTweets = async (req: Request, res: Response) => {
  const user = req.user as IUser;

  const reTweetedTweets = await Retweet.find({ userId: user.id })
    .populate("tweetId")
    .exec();

  return res.json({ message: "Bookmarked tweets", data: reTweetedTweets });
};
