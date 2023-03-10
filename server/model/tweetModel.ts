import mongoose, { Document, Schema, Types } from "mongoose";

export interface ITweet extends Document {
  text: string;
  userId: Types.ObjectId;
  likes: number;
  retweets: number;
  parentId?: Types.ObjectId;
  childIds?: Types.ObjectId[];
  edited: boolean;
}

const tweetSchema = new mongoose.Schema<ITweet>({
  text: {
    type: String,
    required: [true, "Text should be there"],
    maxLength: [255, "Tweeet greater than 255 letters"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  retweets: {
    type: Number,
    default: 0,
  },
  edited: {
    type: Boolean,
    default: false,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: "Tweet",
  },
  childIds: {
    type: [Schema.Types.ObjectId],
    ref: "Tweet",
  },
});

const Tweet = mongoose.model("Tweet", tweetSchema);

export default Tweet;
