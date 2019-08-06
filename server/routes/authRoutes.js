import { Router } from 'express';
import signinController from '../controllers/signinController';

const router = Router();

router.post('/signin', (req, res) => signinController.signin(req.body, res));

module.exports = router;
