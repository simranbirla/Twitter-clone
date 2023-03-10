import mongoose, { Types } from "mongoose";

export interface IBookMark {
  userId: Types.ObjectId;
  tweetId: Types.ObjectId;
}

const bookmarkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tweetId: { type: mongoose.Schema.Types.ObjectId, ref: "Tweet" },
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

export default Bookmark;
