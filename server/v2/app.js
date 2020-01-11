import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index';

const version = 'v2';

const app = express();
dotenv.config();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(`/api/${version}/`, router);

export default app;
