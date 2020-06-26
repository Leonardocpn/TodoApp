import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { loginUser, createUser, editUser, getUserDetails } from "./Api/users";
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

export const api = functions.https.onRequest(app);
