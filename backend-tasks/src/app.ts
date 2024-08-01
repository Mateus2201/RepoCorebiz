import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import taskRoutes from "./routes/taskRoutes";
import userRoutes from "./routes/userRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import cors from "cors";

const app = express();

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "API for managing tasks",
    },
    servers: [
      {
        url: "http://localhost:3001", // Atualize para o URL de produção se necessário
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Ajuste o caminho se necessário
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Configuração do Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middlewares
app.use(morgan("dev")); // Para logging de requisições no console

app.use(
  cors({
    origin: "http://localhost:3000", // Ajuste conforme a necessidade
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(bodyParser.json()); // Para parsing de JSON no corpo das requisições

// Rotas
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

export default app;
