import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import {
  loginUser,
  createUser,
  editUser,
  getUserDetails,
  uploadProfilePhoto,
} from "./Api/users";
import { createTodo, getAllTodos, deleteTodo, editTodo } from "./Api/todos";
import { auth } from "./utils/auth";

const app = express();
app.use(cors());

app.post("/login", loginUser);
app.post("/user/create", createUser);
app.put("/user", auth, editUser);
app.get("/user", auth, getUserDetails);

app.post("/todo/create", auth, createTodo);
app.get("/todos", auth, getAllTodos);
app.delete("/todo/:todoId", auth, deleteTodo);
app.put("/todo/:todoId", auth, editTodo);
app.post("/user/image", auth, uploadProfilePhoto);

export const api = functions.https.onRequest(app);
