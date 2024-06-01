import express from "express";
import cors from "cors";
import { Connection} from "../database/db.js";
import userRouter from "../route/user.route.js";
import profileUserRouter from "../route/profile.route.js";

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(userRouter)
app.use(profileUserRouter)

app.listen(process.env.APP_PORT, () => {
  Connection();
  console.log(`Server is running at http://localhost:${process.env.APP_PORT}`);
});

