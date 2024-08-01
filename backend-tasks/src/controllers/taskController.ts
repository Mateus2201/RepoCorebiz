import { Request, Response } from "express";
import pool from "../utils/database";
import { Task } from "../models/Task";

// Documentação das funções e melhorias
/**
 * Obtém todas as tarefas para um usuário específico.
 * @param req - Request object
 * @param res - Response object
 */
export const getAllTasks = async (req: Request, res: Response) => {
  try {

    const { users } = req.query;

    // Ajustar a consulta se 'users' for um array
    const [rows] = await pool.query(
      `SELECT * FROM tasks WHERE idUser IN (?)`,
      [users]
    );
    res.json(rows);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving tasks", error });
  }
};

/**
 * Cria uma nova tarefa.
 * @param req - Request object
 * @param res - Response object
 */
export const createTask = async (req: Request, res: Response) => {
  const { title, description, dueDate, status, assignedUser } = req.body;
  if (!title || !description || !dueDate || !status || !assignedUser) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO tasks (title, description, dueDate, status, idUser) VALUES (?, ?, ?, ?, ?)",
      [title, description, dueDate, status, assignedUser]
    );

    res.status(201).json({ message: "Task created", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating task", error });
  }
};

/**
 * Atualiza o status de uma tarefa.
 * @param req - Request object
 * @param res - Response object
 */
export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validar o status conforme a necessidade
  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  try {
    const [result] = await pool.query(
      "UPDATE tasks SET status = ? WHERE idTasks = ?",
      [status, id]
    );

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating task", error });
  }
};

/**
 * Remove uma tarefa.
 * @param req - Request object
 * @param res - Response object
 */
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM tasks WHERE idTasks = ?", [id]);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting task", error });
  }
};
