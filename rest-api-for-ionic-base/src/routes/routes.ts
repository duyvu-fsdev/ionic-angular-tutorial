import express from 'express';
import UserValidation from '../middleware/validation/UserValidation';
import authController from '../controller/authController';
import authenticated from '../middleware/validation/authenticated';

const router = express.Router();

router.post('/user/register', UserValidation.registerValidation, authController.register);
router.post('/user/login', authController.login);
router.post('/user/forgot-password', authController.forgotPassword);
router.patch(
 '/user/reset-password',
 authenticated,
 UserValidation.resetPasswordValidation,
 authController.resetPassword,
);

export default router;
