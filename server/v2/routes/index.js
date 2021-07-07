import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import adminRoutes from './adminRoutes';
import authRoutes from './authRoutes';
import bookingRoutes from './bookingRoutes';
import tripRoutes from './tripRoutes';
import specs from '../swaggerDocs';
import Response from '../helpers/responseHelper';

const router = new Router();

router.use('/auth', authRoutes);
router.use('/trips', tripRoutes);
router.use('/bookings', bookingRoutes);
router.use('/admins', adminRoutes);
router.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
router.use('*', (req, res) => Response(res, 404, 'unsuccessful', 'Route Does Not Exist'));

module.exports = router;
