import express from 'express';
import trimRequest from 'trim-request';
import validation from '../helpers/validation';
import orderController from '../controllers/order.controller';
import verifyToken from '../middleware/tokenHandler';
import userValidation from '../middleware/user.validation';


const router = express.Router();

router.post('/',
  verifyToken.validate,
  trimRequest.body,
  validation.purchaseOrder,
  userValidation.validateUserReq,
  orderController.createOrder);

router.patch('/:order_id/price',
  verifyToken.validate,
  trimRequest.body,
  validation.orderIdParam,
  validation.orderPrice,
  userValidation.validateUserReq,
  orderController.updateOrderPrice);

router.get('/sale',
  verifyToken.validate,
  trimRequest.body,
  orderController.getSaleOrders);

router.get('/purchase',
  verifyToken.validate,
  trimRequest.body,
  orderController.getPurchaseOrders);

export default router;
