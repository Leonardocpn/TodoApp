import admin, { db } from "./admin";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      username?: string | null;
      userImageUrl?: string | null;
    }
  }
}

export const auth = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (
    !request.headers.authorization ||
    !request.headers.authorization.startsWith("Bearer ")
  ) {
    return response.status(403).json({ error: "Unauthorized" });
  }
  try {
    const idToken = request.headers.authorization.split("Bearer ")[1];
    const decodeToken = await admin.auth().verifyIdToken(idToken);
    const user = await db
      .collection("users")
      .where("userId", "==", decodeToken.uid)
      .limit(1)
      .get();

    const result = user.docs.map((doc) => {
      return {
        username: doc.get("username"),
        userImageUrl: doc.get("imageUrl"),
      };
    });
    request.username = result[0].username;
    request.userImageUrl = result[0].username.imageUrl;
    next();
    return;
  } catch (error) {
    return response.status(403).json(error);
  }
};
