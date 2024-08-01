import { Router } from "express";
import {
  requestUser,
  validateUserLogin,
  createUser
} from "../controllers/userController";

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request, invalid input
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Authenticate a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address
 *               password:
 *                 type: string
 *                 description: The user's password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 result:
 *                   type: object
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid email or password
 *       400:
 *         description: Bad request, invalid input
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - birthday
 *       properties:
 *         idUser:
 *           type: integer
 *           description: The user ID
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *         password:
 *           type: string
 *           description: The user's password (hashed)
 *         birthday:
 *           type: string
 *           format: date
 *           description: The user's birthday
 */

router.get("/", requestUser);
router.post("/login", validateUserLogin);
router.post("/", createUser);

export default router;
