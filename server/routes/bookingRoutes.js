import { Router } from 'express';
import bookingsController from '../controllers/bookingsController';
import authorization from '../middleware/authenticationCheck';
import adminCheck from '../middleware/adminCheckMiddleware';

const router = Router();

router.use(authorization.setToken, authorization.verifyToken);

router.get('/', adminCheck, (req, res) => bookingsController.allBookings(req, res));
router.get('/:id', (req, res) => bookingsController.userBookings(req.param('id'), res));
router.post('/', (req, res) => bookingsController.createBooking(req, res));
router.delete('/:id', (req, res) => bookingsController.deleteBooking(req, res));
module.exports = router;
