import { Router } from 'express';
import bookingsController from '../controllers/bookingsController';
import authorization from '../middleware/authenticationCheck';

const router = Router();

router.use(authorization.setToken, authorization.verifyToken);

router.get('/', (req, res) => bookingsController.getBookings(req, res));
router.post('/', (req, res) => bookingsController.createBooking(req, res));
router.delete('/:id', (req, res) => bookingsController.deleteBooking(req, res));
module.exports = router;
