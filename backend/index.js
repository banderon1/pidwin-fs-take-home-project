import express from "express";
import http from "http";
import mongoose from "mongoose";
import { Server } from 'socket.io';
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import lucky7Router from "./src/api/lucky7.js";
import userRouter from "./src/api/user.js";
import lucky7 from "./src/utils/lucky7.js";

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "5mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/lucky7", lucky7Router);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`))
  )
  .catch((error) => console.log(error.message));

const server = http.createServer(app);
const io = new Server(server);
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
server.listen(5002, () => {
  console.log(`io server running on port 5002`);
});

lucky7(io);