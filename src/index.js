import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "../routes/user.route.js";
import profileUserRouter from "../routes/profile.route.js";
import session from "express-session";
dotenv.config();

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
    },
  })
);

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
app.use(profileUserRouter);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.APP_PORT}`);
});
