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
      response.status(200).send(result);
    });
};
