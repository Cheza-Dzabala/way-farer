import express from 'express';
import morgan from 'morgan';


import adminRoutes from './routes/adminRoutes';
import authRoutes from './routes/authRoutes';
import tripRoutes from './routes/tripRoutes';
import bookingRoutes from './routes/bookingRoutes';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const version = 'v1';

app.use(`/api/${version}/auth/`, authRoutes);
app.use(`/api/${version}/trips/`, tripRoutes);
app.use(`/api/${version}/bookings/`, bookingRoutes);
app.use(`/api/${version}/admins`, adminRoutes);

// Status 404 (Error) middleware
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'Resource Does Not Exist',
    message: 'Cannot Find Route',
  });
});
export default app;
