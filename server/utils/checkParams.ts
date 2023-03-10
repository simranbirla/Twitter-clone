import { NextFunction, Request, Response } from "express";

function checkParams(params: string[] = []) {
  return function (req: Request, res: Response, next: NextFunction) {
    let valid = true;
    const missingParams = [];
    if (Array.isArray(params)) {
      params.forEach(function (param) {
        if (!req.body[param]) {
          missingParams.push(param);
          valid = false;
        }
      });
    }
    if (valid) {
      next();
    } else {
      return res.status(400).json({ error: `Missing parameters` });
    }
  };
}

export default checkParams;
