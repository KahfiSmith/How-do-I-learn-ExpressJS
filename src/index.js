import express from "express";
import cors from "cors";
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { Connection } from "../database/db.js";
import userRouter from "../routes/user.route.js";
import profileRouter from "../routes/profile.route.js";
import forumRouter from "../routes/forum.route.js";
import consultanRouter from "../routes/consultan.route.js";
import path from 'path';
import dotenv from "dotenv";
import session from 'express-session';
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true
  }
});

app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use(express.json());
app.get("/", (req, res) => {
  return res.status(200).json("Server is running");
});
app.use('/api', userRouter);
app.use('/api', profileRouter);
app.use('/api', forumRouter);
app.use('/api', consultanRouter);

io.on('connection', socket => {
  console.log('A user connected');

  socket.on('sendMessage', data => {
    io.emit('receiveMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

server.listen(process.env.APP_PORT, () => {
  Connection();
  console.log(`Server is running at http://localhost:${process.env.APP_PORT}`);
});
