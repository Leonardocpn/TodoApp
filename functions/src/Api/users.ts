import { firebaseConfig } from "../utils/firebaseConfig";
import firebase from "firebase";
import { Request, Response } from "express";
import { db } from "../utils/admin";

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
      .json({ error: "Email or password is invalid, please try again" });
  }
};

export const createUser = async (request: Request, response: Response) => {
  const newUser = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    password: request.body.password,
    username: request.body.username,
  };

  try {
    if (
      (await db.collection("users").doc(`${newUser.username}`).get()).exists
    ) {
      return response
        .status(400)
        .json({ username: "this username is already taken" });
    } else {
      const userAuthenticated = await firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password);
      const userId = userAuthenticated.user?.uid;
      const token = await userAuthenticated.user?.getIdToken();

      const userCredentials = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
      };
      await db
        .collection("users")
        .doc(`${newUser.username}`)
        .set(userCredentials);
      return response.status(201).json({ token });
    }
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      return response.status(400).json({ email: "Email already in use" });
    } else {
      return response
        .status(500)
        .json({ general: "Something went wrong, please try again" });
    }
  }
};
