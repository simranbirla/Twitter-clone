import { Request, Response } from "express";
import User, { IUser } from "../model/userModel";

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body.photo);
    req.body.photo = req.file?.buffer;
    const user: IUser = await User.create(req.body);

    res.json({ status: 201, message: "User created", data: user });
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

const getUserInfo = async (id: string, res: Response) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.json({ status: 404, message: "User not found", data: false });
    }

    return res.json({ status: 200, message: "User found", data: user });
  } catch (err) {
    return res.json({
      status: 500,
      message: "Something went wrong",
      err,
      data: false,
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  return getUserInfo(req.params.id, res);
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    res.json({ status: 200, message: "Users found", data: users });
  } catch (err) {
    res.json({ status: 500, message: "Something went wrong", err });
  }
};

export const getUserByUsername = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      res.json({
        status: 200,
        doesUserExists: true,
      });
    } else {
      res.json({
        status: 200,
        doesUserExists: false,
      });
    }
  } catch (err) {
    res.json({ status: 500, message: "Something went wrong", err });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  const user = req.user as IUser;
  return getUserInfo(user.id, res);
};
