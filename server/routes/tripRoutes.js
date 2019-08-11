
import { Router } from 'express';
import tripController from '../controllers/tripController';
import authorization from '../middleware/authenticationCheck';
import adminCheck from '../middleware/adminCheckMiddleware';
import validationMiddleware from '../middleware/validationMiddleware/tripsValidationMiddleware';
import relationshipCheck from '../helpers/tripHelpers/tripsRelationships';

const router = Router();

// authentication Middleware

router.post('/', authorization.setToken, [authorization.verifyToken, adminCheck, validationMiddleware, relationshipCheck], (req, res) => tripController.createTrip(req.body, res));

router.get('/', (req, res) => tripController.allTrips(req.body, res));

router.get('/:id', (req, res) => tripController.getTrip(req.param('id'), res));

router.patch('/:id/cancel', authorization.setToken, authorization.verifyToken, adminCheck, (req, res) => tripController.cancelTrip(req.param('id'), res));
module.exports = router;
