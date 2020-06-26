import { firebaseConfig } from "../utils/firebaseConfig";
import firebase from "firebase";
import { Request, Response } from "express";
import admin, { db } from "../utils/admin";
import BusBoy from "busboy";
import path from "path";
import os from "os";
import fs from "fs";

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

export const editUser = async (request: Request, response: Response) => {
  if (
    request.body.userId ||
    request.body.createdAt ||
    request.body.email ||
    request.body.username
  ) {
    return response.status(403).json({ message: "Not allowed to edit" });
  }
  const userRef = db.collection("users").doc(`${request.username}`);
  const doc = await userRef.get();
  if (!doc.exists) {
    return response.status(404).json({ error: "User not found" });
  } else if ((await userRef.get()).data()?.username !== request.username) {
    return response.status(403).json({ error: "UnAuthorized" });
  } else {
    try {
      await userRef.update(request.body);
      return response.json({ message: "User update successfully" });
    } catch (err) {
      return response.status(500).json({
        message: "Cannot Update the value",
      });
    }
  }
};

export const getUserDetails = async (request: Request, response: Response) => {
  const userRef = db.collection("users").doc(`${request.username}`);
  const doc = await userRef.get();
  if (!doc.exists) {
    return response.status(404).json({ error: "User not found" });
  } else if ((await userRef.get()).data()?.username !== request.username) {
    return response.status(403).json({ error: "UnAuthorized" });
  } else {
    try {
      return response.json({ userData: doc.data() });
    } catch (err) {
      return response.status(500).json({ error: err.code });
    }
  }
};
