import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import specs from './swaggerDocs';

import adminRoutes from './routes/adminRoutes';
import authRoutes from './routes/authRoutes';
import tripRoutes from './routes/tripRoutes';
import bookingRoutes from './routes/bookingRoutes';

const version = 'v2';

const app = express();
dotenv.config();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(`/api/${version}/auth`, authRoutes);
app.use(`/api/${version}/trips`, tripRoutes);
app.use(`/api/${version}/bookings`, bookingRoutes);
app.use(`/api/${version}/admins`, adminRoutes);

app.use(`/api/${version}/docs`, swaggerUi.serve, swaggerUi.setup(specs));
// Status 404 (Error) middleware
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'Resource Does Not Exist',
    message: 'Cannot Find Route',
  });
});
export default app;
