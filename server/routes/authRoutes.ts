import express, { Request, Response } from "express";
import passport from "passport";

import { IUser } from "../model/userModel";
import checkParams from "../utils/checkParams";
import { upload } from "../utils/multerUpload";
import {
  sendToken,
  passportAuth,
  jwtAuth,
  logOut,
} from "../controllers/authController";

const router = express.Router();

router.post(
  "/signup",
  upload.single("photo"),
  passport.authenticate("signup", { session: false }),
  sendToken
);

router.post(
  "/login",
  checkParams(["email", "password"]),
  passportAuth,
  sendToken
);

router.get("/example", jwtAuth, (req: Request, res: Response) => {
  console.log(req.user);
  const user = req.user as IUser;
  return res.send({ id: user.id });
});

router.post("/logout", jwtAuth, logOut);

export default router;
