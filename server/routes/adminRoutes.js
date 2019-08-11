import { Router } from 'express';
import adminController from '../controllers/adminController';
import adminCheck from '../middleware/adminCheckMiddleware';
import authorization from '../middleware/authenticationCheck';
import signupValidation from '../middleware/validationMiddleware/signupValidationMiddleware';

const router = Router();
router.use(authorization.setToken, authorization.verifyToken, adminCheck);

router.get('/', (req, res) => adminController.allAdmins(res));
router.post('/', signupValidation, (req, res) => adminController.create(req, res));
module.exports = router;
