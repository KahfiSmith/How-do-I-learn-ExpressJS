import express from "express";
import cors from "cors";
import { Connection } from "../database/db.js";
import userRouter from "../routes/user.route.js";
import profileRouter from "../routes/profile.route.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  return res.status(200).json("Server is running");
});
app.use(userRouter);
app.use(profileRouter);

app.listen(process.env.APP_PORT, () => {
  Connection();
  console.log(`Server is running at http://localhost:${process.env.APP_PORT}`);
});
