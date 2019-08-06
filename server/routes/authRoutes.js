import { Router } from 'express';
import signinController from '../controllers/signinController';
import signupController from '../controllers/signupController';

const router = Router();

router.post('/signin', (req, res) => signinController.signin(req.body, res));
router.post('/signup', (req, res) => signupController.signup(req.body, res));


module.exports = router;
