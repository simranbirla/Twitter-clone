import mongoose, { Document, Types } from "mongoose";

export interface ILikes extends Document {
  userId: Types.ObjectId;
  tweet: Types.ObjectId;
}

const likesModel = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tweetId: { type: mongoose.Schema.Types.ObjectId, ref: "Tweet" },
});

const Likes = mongoose.model("Likes", likesModel);

export default Likes;
