import express from 'express';
import trimRequest from 'trim-request';
import validation from '../helpers/validation';
import carController from '../controllers/car.controller';
import carValidation from '../middleware/car.validation';
import createCar from '../helpers/carRequestChecker';
import verifyToken from '../middleware/tokenHandler';
import userValidation from '../middleware/user.validation';


const router = express.Router();

router.post('/car',
  verifyToken.validate,
  createCar.upload.single('image'),
  trimRequest.body,
  carValidation.validatePostCar,
  carController.createCar);

router.delete('/car/:car_id',
  verifyToken.validate,
  trimRequest.body,
  validation.deleteCar,
  userValidation.validateUserReq,
  carController.deleteCar);

router.get('/car',
  verifyToken.validate,
  trimRequest.param,
  carController.getCars);
export default router;
