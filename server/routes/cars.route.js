import express from 'express';
import trimRequest from 'trim-request';
import carController from '../controllers/car.controller';
import carValidation from '../middleware/car.validation';
import createCar from '../helpers/carRequestChecker';
import verifyToken from '../middleware/tokenHandler';


const router = express.Router();

router.post('/',
  verifyToken.validate,
  createCar.upload.single('image'),
  trimRequest.body,
  carValidation.validatePostCar,
  carController.createCar);

export default router;
