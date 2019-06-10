import orderData from '../utils/dummyOrderData';
import Order from '../models/order.model';
import OrderServices from '../services/orderServices';

class OrderController {
  static async createOrder(req, res) {
    try {
      const {
        car_id,
        price_offered,
      } = req.body;
      const userId = req.userData.user;
      const carForPurchase = await OrderServices.findCar(car_id);
      if (!carForPurchase) {
        throw new Error('Car with that id doest not exits');
      }
      const newOrder = new Order();
      newOrder.id = orderData.orders.length + 1;
      newOrder.price_offered = price_offered;
      newOrder.car_id = carForPurchase.id;
      newOrder.price = carForPurchase.price;
      newOrder.buyer = userId;
      newOrder.created_on = new Date();
      orderData.orders.push(newOrder);
      return res.status(201).json({
        status: 201,
        data: newOrder,
      });
    } catch (error) {
      return res.status(409).json({
        status: 409,
        message: error.message,
      });
    }
  }

  static async updateOrderPrice(req, res) {
    try {
      const checkIfOrderExist = await orderData.orders
        .find(order => order.id == req.params.order_id && order.buyer === req.userData.user && order.status === 'pending');
      if (!checkIfOrderExist) {
        throw new Error('You cant update the price of this order');
      }
      const orderIndex = orderData.orders.indexOf(checkIfOrderExist);
      orderData.orders[orderIndex].price_offered = req.body.price_offered;
      return res.status(200).json({
        status: 200,
        data: orderData.orders[orderIndex],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  }
}
export default OrderController;
