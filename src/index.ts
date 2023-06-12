import express from "express";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import upload from "express-fileupload";
import database from './db'
import http from "http"

require('dotenv').config();

import APIRequest from './api/api.routes.';
import { notFound } from "./middleware";
import tableNames from "./constant/tableNames";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: [
      'GET',
      'POST'
    ]
  }
});

io.on("connection", (socket) => {
  socket.on("new_order", (data) => {
    socket.broadcast.emit("receive_order", data);
  })
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload());
app.use(compression());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/', async (req: express.Request, res: express.Response, next) => {
  try {
    return res.json(req.url)
  } catch (error) {
    return res.status(400).json(error);
  }
});

app.use('/api', APIRequest);

app.use(notFound);

const PORT: number = Number(process.env.PORT) || 3333;
server.listen(PORT, () => {
  console.log('listening on http://localhost:' + PORT);
});