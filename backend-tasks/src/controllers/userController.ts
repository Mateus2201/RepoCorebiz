import { Request, Response } from "express";
import pool from "../utils/database";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { RowDataPacket } from "mysql2";

// Função para buscar usuários pelo nome
export const requestUser = async (req: Request, res: Response) => {
  const { name } = req.query;

  if (!name) {
    return res
      .status(400)
      .json({ message: "Name query parameter is required" });
  }

  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM Users WHERE name LIKE ?",
      [`%${name}%`]
    );
    const users: User[] = rows as User[];
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users", error });
  }
};

// Função para validar login do usuário
export const validateUserLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM Users WHERE email = ?",
      [email]
    );
    const users: User[] = rows as User[];

    if (users.length > 0) {
      const user = users[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        res.status(200).json({ message: "User verified", result: user });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error verifying user", error });
  }
};

// Função para criar um novo usuário
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, birthday } = req.body;

  if (!name || !email || !password || !birthday) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      "INSERT INTO Users (name, email, password, birthday) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, birthday]
    );

    res.status(201).json({ message: "User created", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user", error });
  }
};
