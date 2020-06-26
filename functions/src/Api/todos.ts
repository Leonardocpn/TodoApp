import { Request, Response } from "express";
import { db } from "../utils/admin";

export const createTodo = async (request: Request, response: Response) => {
  const newTodo = {
    description: request.body.description,
    createdAt: new Date().toISOString(),
    isCompleted: false,
  };

  try {
    const addDoc = await db.collection("todos").add(newTodo);
    return response.json({
      id: addDoc.id,
      description: newTodo.description,
      createdAt: newTodo.createdAt,
      isCompleted: newTodo.isCompleted,
    });
  } catch (err) {
    return response.status(500).json({ error: "Something went wrong" });
  }
};

export const getAllTodos = (request: Request, response: Response) => {
  db.collection("todos")
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
  } else {
    await todoRef.delete();
    return response.json({ message: "Todo delete successfully" });
  }
};

export const editTodo = async (request: Request, response: Response) => {
  if (request.body.todoId || request.body.createdAt) {
    return response.status(403).json({ message: "Not allowed to edit" });
  }

  const document = db.collection("todos").doc(`${request.params.todoId}`);
  try {
    await document.update(request.body);
    return response.json({ message: "Todo updated successfully" });
  } catch (error) {
    return response.status(500).json({ error: error.code });
  }
};
