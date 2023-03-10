import { Request, Response } from "express";
import User, { IUser } from "../model/userModel";

export const createUser = async (req: Request, res: Response) => {
  try {
    req.body.photo = req.file?.buffer;
    const user: IUser = await User.create(req.body);
    const userObj = user.toObject();
    const photoBase64 = req.file?.buffer.toString("base64");

    userObj.photo = photoBase64;

    res.json({ status: 201, message: "User created", data: userObj });
  } catch (err) {
    res.json({ status: 500, message: "Something went wrong", err });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    res.json({ status: 204, message: "User deleted" });
  } catch (err) {
    res.json({ status: 500, message: "Something went wrong", err });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.json({ status: 404, message: "User not found" });
    }

    return res.json({ status: 200, message: "User found", data: user });
  } catch (err) {
    return res.json({ status: 500, message: "Something went wrong", err });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    res.json({ status: 200, message: "Users found", data: users });
  } catch (err) {
    res.json({ status: 500, message: "Something went wrong", err });
  }
};
