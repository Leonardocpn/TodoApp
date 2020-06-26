import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { loginUser } from "./Api/users";

const app = express();
app.use(cors());

app.post("/login", loginUser);

export const api = functions.https.onRequest(app);
