import { Request, Response } from "express";
import { db } from "../utils/admin";

export const createTodo = async (request: Request, response: Response) => {
  const newTodo = {
    description: request.body.description,
    createdAt: new Date().toISOString(),
    isCompleted: false,
    username: request.username,
  };

  try {
    const addDoc = await db.collection("todos").add(newTodo);
    return response.json({
      id: addDoc.id,
      description: newTodo.description,
      createdAt: newTodo.createdAt,
      isCompleted: newTodo.isCompleted,
      username: newTodo.username,
    });
  } catch (err) {
    return response.status(500).json({ error: "Something went wrong" });
  }
};

export const getAllTodos = (request: Request, response: Response) => {
  db.collection("todos")
    .where("username", "==", request.username)
    .orderBy("createdAt", "desc")
    .onSnapshot((queryResponse) => {
      const result = queryResponse.docs.map((doc) => {
        return {
          id: doc.id,
          description: doc.get("description"),
          createdAt: doc.get("createdAt"),
          isCompleted: doc.get("isCompleted"),
        };
      });
      return response.status(200).send(result);
    });
};

export const deleteTodo = async (request: Request, response: Response) => {
  const todoRef = db.collection("todos").doc(`${request.params.todoId}`);
  const doc = await todoRef.get();
  if (!doc.exists) {
    return response.status(404).json({ error: "Todo not found" });
  } else if ((await todoRef.get()).data()?.username !== request.username) {
    return response.status(403).json({ error: "UnAuthorized" });
  } else {
    await todoRef.delete();
    return response.json({ message: "Todo delete successfully" });
  }
};

export const editTodo = async (request: Request, response: Response) => {
  if (request.body.todoId || request.body.createdAt) {
    return response.status(403).json({ message: "Not allowed to edit" });
  }
  const todoRef = db.collection("todos").doc(`${request.params.todoId}`);
  const doc = await todoRef.get();
  if (!doc.exists) {
    return response.status(404).json({ error: "Todo not found" });
  } else if ((await todoRef.get()).data()?.username !== request.username) {
    return response.status(403).json({ error: "UnAuthorized" });
  } else {
    await todoRef.update(request.body);
    return response.json({ message: "Todo update successfully" });
  }
};
