import OrderServices from '../services/orderServices';

class OrderController {
  static async createOrder(req, res) {
    try {
      const checkIfUserExist = await OrderServices.checkUser(req.userData.user);
      if (!checkIfUserExist) {
        throw new Error('User not registered');
      }
      const carForPurchase = await OrderServices.findCar(req.body.car_id);
      if (!carForPurchase) {
        throw new Error('Car with that id doest not exits');
      }
      if (carForPurchase.status === 'sold') {
        throw new Error('this car has been sold');
      }
      const newOrder = await OrderServices.createOrder(req, carForPurchase);
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
      const checkIfUserExist = await OrderServices.checkUser(req.userData.user);
      if (!checkIfUserExist) {
        throw new Error('User not registered');
      }
      const checkIfOrderExist = await OrderServices.findOrder(req.params.order_id, req.userData.user);
      if (!checkIfOrderExist) {
        throw new Error('You cant update the price of this order');
      }
      const updateOrder = await OrderServices.updatePrice(req.params.order_id, req.body.price_offered);
      return res.status(200).json({
        status: 200,
        data: updateOrder,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  }

  static async getSaleOrders(req, res) {
    try {
      const checkIfUserExist = await OrderServices.checkUser(req.userData.user);
      if (!checkIfUserExist) {
        throw new Error('User not registered');
      }
      const queryOrders = await OrderServices.findSalesOrder(req.userData.user);
      return res.status(200).json({
        status: 200,
        data: queryOrders,
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
