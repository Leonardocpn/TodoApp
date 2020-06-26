import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { loginUser, createUser } from "./Api/users";
import { createTodo, getAllTodos, deleteTodo } from "./Api/todos";

const app = express();
app.use(cors());

app.post("/login", loginUser);
app.post("/user/create", createUser);
app.post("/todo/create", createTodo);
app.get("/todos", getAllTodos);
app.delete("/todo/:todoId", deleteTodo);

export const api = functions.https.onRequest(app);
