import cloudinary from '../config/cloudinary';
import carsData from '../utils/dummyCarData';
import Car from '../models/car.model';

class UserController {
  static async createCar(req, res) {
    try {
      const {
        name,
        model,
        price,
        bodyType,
        state,
        manufacturer,
      } = req.body;
      const userId = req.userData.user;
      const result = await cloudinary.uploader.upload(req.file.path);
      const newCar = new Car();
      newCar.id = carsData.cars.length + 1;
      newCar.name = name;
      newCar.img = result.secure_url;
      newCar.owner = userId;
      newCar.created_on = new Date();
      newCar.name = name;
      newCar.model = model;
      newCar.price = price;
      newCar.bodyType = bodyType;
      newCar.state = state;
      newCar.manufacturer = manufacturer;
      carsData.cars.push(newCar);
      return res.status(201).json({
        status: 201,
        data: newCar,
      });
    } catch (error) {
      return res.status(409).json({
        status: 409,
        message: error.message,
      });
    }
  }
}
export default UserController;
