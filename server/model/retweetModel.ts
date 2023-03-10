import mongoose, { Document, Schema, Types } from "mongoose";

export interface IRetweet extends Document {
  userId: Types.ObjectId;
  tweetId: Types.ObjectId;
}

const retweetSchema = new mongoose.Schema<IRetweet>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tweetId: { type: Schema.Types.ObjectId, ref: "Tweet" },
});

const Retweet = mongoose.model("Retweet", retweetSchema);

export default Retweet;
