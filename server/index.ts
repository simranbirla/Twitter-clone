import dotenv from "dotenv";
dotenv.config();

import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import passport from "passport";
import cors from "cors";
import tweetRoutes from "./routes/tweetRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import likeRoutes from "./routes/likeRoutes";
import bookmarkRoutes from "./routes/bookmarkRoutes";
import retweetRoutes from "./routes/retweetRoutes";

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(passport.initialize());
app.use(cors());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI as string);
    console.log("DATABASE CONNECTED");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

app.get("/", (req: Request, res: Response) => {
  res.json({ status: 200, message: "port started" });
});

app.use("/tweet", tweetRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/like", likeRoutes);
app.use("/bookmark", bookmarkRoutes);
app.use("/retweet", retweetRoutes);

app.all("*", (err: any, req: Request, res: Response) => {
  return res.json({ message: `Cannot find ${req.url} url ` });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  return res.send({ message: "Error", err });
});

app.listen(process.env.PORT, async () => {
  await connectDB();
  console.log("PORT started");
});
