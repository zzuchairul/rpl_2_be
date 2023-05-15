import express from "express";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
require('dotenv').config();

import APIRequest from './api/api.routes.';
import { notFound } from "./middleware";

const app = express();

app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(morgan('dev'));

app.get('/', (req: express.Request, res: express.Response, next) => {
  res.status(200).send('API is running');
});

app.use('/api', APIRequest);

app.use(notFound);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`listening at http://localhost:` + PORT)
});