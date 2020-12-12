/* eslint-disable prettier/prettier */
import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import hbs from './config/hbs';


import routes from './routes';
import database from './config/database';
import {
  appErrorHandler,
  genericErrorHandler,
  notFound
} from './middlewares/error.middleware';
import logger, { logStream } from './config/logger';

import morgan from 'morgan';
import { log } from 'console';

const app = express();
const host = process.env.APP_HOST;
const port = process.env.APP_PORT;
const api_version = process.env.API_VERSION;

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined', { stream: logStream }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('hbs', hbs);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

database();

app.use(`/api/${api_version}`, routes());
app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(notFound);

app.listen(port, () => {
  log(`Server started at ${host}:${port}/api/${api_version}/`);
});

export default app;
