import { Router } from 'express';
import signinController from '../controllers/signinController';
import signupController from '../controllers/signupController';
import signInValidation from '../middleware/validationMiddleware/signinValidationMiddleware';
import signupValidation from '../middleware/validationMiddleware/signupValidationMiddleware';

const router = Router();

router.post('/signin', signInValidation, (req, res) => signinController.signin(req.body, res));
router.post('/signup', signupValidation, (req, res) => signupController.signup(req.body, res));


module.exports = router;
