import { Router } from 'express';
import bookingsController from '../controllers/bookingsController';
import authorization from '../middleware/authenticationCheck';
import validationMiddleware from '../middleware/bookings/bookingsValidationMiddleware';
import relationshipChecker from '../middleware/bookings/bookingRelationships';
import verifyBooking from '../middleware/bookings/verifyBooking';
import superUserDelete from '../middleware/bookings/superUserDelete';
import seatChecker from '../middleware/bookings/bookingSeatChecker';

const router = Router();

router.use(authorization.setToken, authorization.verifyToken);

router.get('/', (req, res) => bookingsController.getBookings(req, res));
router.post('/', validationMiddleware, relationshipChecker, seatChecker, (req, res) => bookingsController.createBooking(req, res));
router.delete('/:id', verifyBooking, superUserDelete, (req, res) => bookingsController.deleteBooking(req, res));
module.exports = router;
