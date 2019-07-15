import express from 'express';
import trimRequest from 'trim-request';
import carController from '../controllers/car.controller';
import carValidation from '../middleware/car.validation';
import verifyToken from '../middleware/tokenHandler';
import createCar from '../helpers/carRequestChecker';
import validation from '../helpers/validation';
import userValidation from '../middleware/user.validation';


const router = express.Router();

router.post('/',
  verifyToken.validate,
  trimRequest.body,
  createCar.upload.single('img_url'),
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

router.patch('/:car_id/price',
  verifyToken.validate,
  trimRequest.param,
  carController.updateCarPrice);

router.patch('/:car_id/status',
  verifyToken.validate,
  trimRequest.param,
  validation.carIdParam,
  validation.carStatus,
  userValidation.validateUserReq,
  carController.updateCarStatus);

export default router;
