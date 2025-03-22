import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
