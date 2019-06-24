import express from 'express';
import validation from '../helpers/validation';
import userValidation from '../middleware/user.validation';
import userController from '../controllers/user.controller';


const router = express.Router();

router.post('/auth/signup',
  validation.signUpValidation,
  userValidation.validateUserReq,
  userController.registerUser);

router.post('/auth/signin',
  validation.signInValidation,
  userValidation.validateUserReq,
  userController.loginUser);

export default router;
