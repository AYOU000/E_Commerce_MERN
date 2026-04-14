import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { extendRequest } from "../types/extendRequest.js";

const validateJWT = (req: extendRequest, res: Response, next: NextFunction) => {
  const authorizationheader = req.get("authorization");

  if (!authorizationheader) {
    res.status(403).json({ message: "Authorization header was not provided" });
    return;
  }

  const token = authorizationheader.split(" ")[1];

  if (!token) {
    res.status(403).json({ message: "Bearer token not found" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRETKEY || "", async (err: any, payload: any) => {
  if (err) {
    res.status(403).json({ message: "Invalid token" });
    return;
  }

  if (!payload) {
    res.status(403).json({ message: "Invalid token payload" });
    return;
  }

  const payloadUser = payload as {
    firstname: string;
    lastname: string;
    email: string;
  };

  const user = await userModel.findOne({ email: payloadUser.email });
  if (!user) {
    res.status(403).json({ message: "User not found" });
    return;
  }

  req.user = user;
  next();
});
};

export default validateJWT;