import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "../routes/user.route.js";
dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(userRouter);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.APP_PORT}`);
});
