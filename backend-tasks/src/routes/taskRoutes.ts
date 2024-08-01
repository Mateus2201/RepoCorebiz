import { Router } from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

const router = Router();

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Retrieve a list of tasks
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: The created task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 * /api/tasks/{id}:
 *   put:
 *     summary: Update an existing task
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: The updated task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *   delete:
 *     summary: Delete a task
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task ID
 *     responses:
 *       204:
 *         description: The task was deleted
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - dueDate
 *         - status
 *         - assignedUser
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the task
 *         title:
 *           type: string
 *           description: The title of the task
 *         description:
 *           type: string
 *           description: A detailed description of the task
 *         dueDate:
 *           type: string
 *           format: date
 *           description: The due date for the task
 *         status:
 *           type: string
 *           enum: [pending, in-progress, completed]
 *           description: The current status of the task
 *         assignedUser:
 *           type: string
 *           description: The user assigned to the task
 */

router.get("/", getAllTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
