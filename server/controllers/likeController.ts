import { Request, Response } from "express";
import Likes from "../model/likesModel";
import Tweet from "../model/tweetModel";
import { IUser } from "../model/userModel";

export const likeTweet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const tweet = await Tweet.findById(req.params.id);

    if (!tweet) {
      return res.json({ status: 404, message: "Tweet Not found" });
    }

    const user = req.user as IUser;
    const liked = await Likes.findOne({ tweetId: id, userId: user.id });

    if (liked) {
      await Likes.findOneAndDelete({ tweetId: id, userId: user.id });
      const unlikedTweet = await Tweet.findByIdAndUpdate(
        id,
        { $inc: { likes: -1 } },
        { new: true }
      );

      return res.json({
        status: 200,
        message: "Tweet unliked",
        data: unlikedTweet,
      });
    }

    await Likes.create({ tweetId: id, userId: user.id });
    const likedTweet = await Tweet.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    res.json({ status: 200, message: "Tweet Liked", data: likedTweet });
  } catch (err) {
    res.json({
      status: 500,
      message: "Something went wrong while creating the tweet",
      err,
    });
  }
};

export const getLikedTweets = async (req: Request, res: Response) => {
  const user = req.user as IUser;

  const likedTweets = await Likes.find({ userId: user.id })
    .populate("tweetId")
    .exec();

  return res.json({ message: "Liked tweets", data: likedTweets });
};
