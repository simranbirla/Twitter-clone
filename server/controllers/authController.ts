import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import User, { IUser } from "../model/userModel";

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
        const userObj = user.toObject();
        const photoBase64 = req.file?.buffer.toString("base64");
        userObj.photo = photoBase64;

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
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY as string,
    },
    (jwt_payload, done) => {
      console.log("reached", jwt_payload);
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
    console.log("heyy", user);
    if (err) {
      return res.status(401).json({ error: err.message });
    }
    if (!user) {
      return res.status(401).json({ error: "User not authorized" });
    }
    next();
  })(req, res, next);
};

export const getSignedToken = (user: IUser) => {
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: 10,
    }
  );
  return token;
};

export const sendToken = (req: Request, res: Response) => {
  try {
    const token = getSignedToken(req.user as IUser);
    return res.send({
      status: 200,
      token,
      data: req.user,
    });
  } catch (e) {
    console.log("Error", e);
    return res.send({ status: 500, message: "Cannot sign in " });
  }
};
