
import { Router } from 'express';
import tripController from '../controllers/tripController';
import authorization from '../middleware/authenticationCheck';
import adminCheck from '../middleware/adminCheckMiddleware';

const router = Router();

// authentication Middleware

router.post('/', authorization.setToken, authorization.verifyToken, adminCheck, (req, res) => tripController.createTrip(req.body, res));

router.get('/', (req, res) => tripController.allTrips(req.body, res));

router.patch('/:id/cancel', authorization.setToken, authorization.verifyToken, adminCheck, (req, res) => tripController.cancelTrip(req.param('id'), res));
module.exports = router;
