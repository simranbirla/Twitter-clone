import { Request } from "express";

export const cookieExtractor = (req: Request) => {
  var token = null;
  if (req && req.cookies) token = req.cookies["jwt"];
  return token;
};
