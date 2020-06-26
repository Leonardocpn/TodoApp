import firebase from "firebase";
import { firebaseConfig } from "../utils/firebaseConfig";
import { Request, Response } from "express";

firebase.initializeApp(firebaseConfig);

export const loginUser = async (request: Request, response: Response) => {
  const user = {
    email: request.body.email,
    password: request.body.password,
  };

  try {
    const login = await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password);
    const token = await login.user?.getIdToken();
    return response.json({ token });
  } catch (err) {
    return response
      .status(403)
      .json({ error: "Email or password invalid, please try again" });
  }
};
