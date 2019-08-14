import { Router } from 'express';
import bookingsController from '../controllers/bookingsController';
import authorization from '../middleware/authenticationCheck';
import validationMiddleware from '../middleware/validationMiddleware/bookingsValidationMiddleware';
import relationshipChecker from '../helpers/bookingHelpers/bookingRelationships';
import verifyBooking from '../helpers/bookingHelpers/verifyBooking';
import seatChecker from '../helpers/bookingHelpers/bookingSeatChecker';

const router = Router();

router.use(authorization.setToken, authorization.verifyToken);

router.get('/', (req, res) => bookingsController.getBookings(req, res));
router.post('/', validationMiddleware, relationshipChecker, seatChecker, (req, res) => bookingsController.createBooking(req, res));
router.delete('/:id', verifyBooking, (req, res) => bookingsController.deleteBooking(req, res));
module.exports = router;
