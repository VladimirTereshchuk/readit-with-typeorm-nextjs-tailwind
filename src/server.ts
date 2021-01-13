import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import morgan from "morgan";
import trim from "./middleware/trim";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";
import postRoutes from "./routes/posts";
dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(trim);
app.use(cookieParser());

app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  try {
    await createConnection();
    console.log("Database connected!");
  } catch (error) {
    console.log(error);
  }
});
