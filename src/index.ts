import express from "express";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import upload from "express-fileupload";
import database from './db'
require('dotenv').config();

import APIRequest from './api/api.routes.';
import { notFound } from "./middleware";
import tableNames from "./constant/tableNames";

const app = express();

app.use(cors('*'));
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
    const item = await database(tableNames.item).select('*');
    return res.status(200).json(item.filter((elem) => elem.available === 1));
  } catch (error) {
    return res.status(400).json(error);
  }
});

app.use('/api', APIRequest);

app.use(notFound);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`listening at http://localhost:` + PORT)
});