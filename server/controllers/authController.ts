import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy } from "passport-jwt";
import jwt from "jsonwebtoken";
import { CookieOptions, NextFunction, Request, Response } from "express";
import passport from "passport";
import User, { IUser } from "../model/userModel";
import { cookieExtractor } from "../utils/cookieExtractor";

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req: any, email, password, done) => {
      try {
        req.body.photo = req.file?.buffer;
        const user: IUser = await User.create(req.body);

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req: any, email, password, done) => {
      try {
        req.body.photo = req?.file?.buffer;
        const user: IUser | null = await User.findOne({ email });

        if (!user) {
          return done({ message: "User not found", status: 404 }, false);
        }

        const passwordMatch = await user.checkPassword(password, user.password);

        if (!passwordMatch) {
          return done(
            { message: "Credentials don't match", status: 401 },
            false
          );
        }

        const userObj: IUser = user.toObject();
        return done(null, userObj);
      } catch (error) {
        console.log(error);
        done({ message: "Something went wrong", status: 500 });
      }
    }
  )
);

passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET_KEY as string,
    },
    (jwt_payload, done) => {
      return done(null, jwt_payload);
    }
  )
);

export const passportAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "login",
    { session: false },
    (err: any, user: IUser) => {
      if (err) {
        return res.status(err.status).json({ error: err.message });
      }

      if (!user) {
        return res
          .status(401)
          .json({ error: "User does not exist or not authroized" });
      }

      req.user = user;
      next();
    }
  )(req, res, next);
};

export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err: any, user: any) => {
    if (err) {
      return res.status(401).json({ error: err.message });
    }
    if (!user) {
      return res
        .status(401)
        .json({ error: "User not authorized", data: false });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export const getSignedToken = (user: IUser) => {
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

export const sendToken = (req: Request, res: Response) => {
  try {
    const token = getSignedToken(req.user as IUser);
    const cookieOptions: CookieOptions = {
      expires: new Date(
        Date.now() +
        (process.env.JWT_COOKIE_EXPIRES_IN as unknown as number) *
        24 *
        60 *
        60 *
        1000
      ),
      httpOnly: true,
      domain: "localhost",
      //secure: true,
    };

    res.cookie("jwt", token, cookieOptions);
    return res.send({
      status: 200,
      data: req.user,
    });
  } catch (e) {
    console.log("Error", e);
    return res.send({ status: 500, message: "Cannot sign in " });
  }
};

export const logOut = (req: Request, res: Response) => {
  res.clearCookie("jwt");
  return res.json({ status: 202, message: "Logged Out" });
};
