import express from 'express';
import RequestValidator from '../middlewares/RequestValidator';
import { SignUpDto, SignInDto } from '../dto/auth/user';
import { Container } from 'typedi';
import AuthController from '../controllers/AuthController';

const router = express.Router();

const authController = Container.get(AuthController);

router.post('/register', RequestValidator.validate(SignUpDto), authController.signUp);
router.post('/sign-in', RequestValidator.validate(SignInDto), authController.signIn);
// router.get('/users', authController.getAllUsers);
router.get('/test', authController.test);

export default router;
