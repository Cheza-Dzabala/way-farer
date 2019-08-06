import express from 'express';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes';
import tripRoutes from './routes/tripRoutes';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const version = 'v1';


app.use(`/api/${version}/auth/`, authRoutes);
app.use(`/api/${version}/trips/`, tripRoutes);


// Status 404 (Error) middleware
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'Resource Does Not Exist',
    message: 'Cannot Find Route',
  });
});
export default app;
