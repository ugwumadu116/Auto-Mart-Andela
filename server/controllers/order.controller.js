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
}
export default OrderController;
