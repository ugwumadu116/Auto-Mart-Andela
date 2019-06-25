import express from 'express';
import trimRequest from 'trim-request';
import carController from '../controllers/car.controller';
import carValidation from '../middleware/car.validation';
import createCar from '../helpers/carRequestChecker';
import verifyToken from '../middleware/tokenHandler';
import validation from '../helpers/validation';
import userValidation from '../middleware/user.validation';


const router = express.Router();

router.post('/',
  verifyToken.validate,
  createCar.upload.single('image'),
  trimRequest.body,
  carValidation.validatePostCar,
  carController.createCar);

router.delete('/:car_id',
  verifyToken.validate,
  trimRequest.param,
  validation.carIdParam,
  userValidation.validateUserReq,
  carController.deleteCar);

router.get('/',
  verifyToken.validate,
  trimRequest.param,
  carController.getCars);

router.get('/:car_id',
  verifyToken.validate,
  trimRequest.param,
  validation.carIdParam,
  userValidation.validateUserReq,
  carController.getSingleCar);

export default router;