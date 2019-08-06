import { Router } from 'express';
import adminController from '../controllers/adminController';
import adminCheck from '../middleware/adminCheckMiddleware';
import authorization from '../middleware/authenticationCheck';

const router = Router();
router.use(authorization.setToken, authorization.verifyToken, adminCheck);

router.get('/', (req, res) => adminController.allAdmins(res));
router.post('/', (req, res) => adminController.create(req, res));
module.exports = router;
