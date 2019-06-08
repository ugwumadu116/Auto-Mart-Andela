import cloudinary from '../config/cloudinary';
import carsData from '../utils/dummyCarData';
import Car from '../models/car.model';
import CarServices from '../services/car.services';

class UserController {
  static async createCar(req, res) {
    try {
      const {
        name,
        model,
        price,
        body_type,
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
      newCar.body_type = body_type;
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

  static async deleteCar(req, res) {
    try {
      const isAdmin = await CarServices.CheckIfUserIsAdmin(req.userData.user);
      if (!isAdmin) {
        throw new Error('Unauthorized only admin can delete');
      }
      const checkIfCarExist = await CarServices.findCar(req.params.car_id);
      if (!checkIfCarExist) {
        throw new Error('Car with that id doest not exits');
      }
      const carIndex = carsData.cars.indexOf(checkIfCarExist);
      carsData.cars.splice(carIndex, 1);
      return res.status(200).json({
        status: 200,
        data: 'Car Ad successfully deleted',
      });
    } catch (error) {
      if (error.message === 'Car with that id doest not exits') {
        return res.status(404).json({
          status: 404,
          message: error.message,
        });
      }
      return res.status(401).json({
        status: 401,
        message: error.message,
      });
    }
  }

  static async getCars(req, res) {
    try {
      const queryObj = req.query;
      if ('min_price' in queryObj) {
        const carRange = carsData.cars
          .filter(car => car.status === queryObj['status'] && car.price >= queryObj['min_price'] && car.price <= queryObj['max_price']);
        return res.status(200).json({
          status: 200,
          data: carRange,
        });
      }
      const queryKeys = Object.keys(queryObj);
      const result = carsData.cars.filter(car => queryKeys.every(key => car[key] === queryObj[key]));
      return res.status(200).json({
        status: 200,
        data: result,
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: error.message,
      });
    }
  }

  static async getSingleCar(req, res) {
    try {
      const checkIfCarExist = await CarServices.findCar(req.params.car_id);
      if (!checkIfCarExist) {
        throw new Error('Car with that id doest not exits');
      }
      return res.status(200).json({
        status: 200,
        data: checkIfCarExist,
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: error.message,
      });
    }
  }

  static async updateCarPrice(req, res) {
    try {
      const checkIfCarExist = await carsData.cars
        .find(car => car.id == req.params.car_id && car.owner === req.userData.user);
      if (!checkIfCarExist) {
        throw new Error('Car with that id doest not exits');
      }
      const carIndex = carsData.cars.indexOf(checkIfCarExist);
      carsData.cars[carIndex].price = req.body.price;
      return res.status(200).json({
        status: 200,
        data: carsData.cars[carIndex],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  }

  static async updateCarStatus(req, res) {
    try {
      const checkIfCarExist = await carsData.cars
        .find(car => car.id == req.params.car_id && car.owner === req.userData.user);
      if (!checkIfCarExist) {
        throw new Error('Car with that id doest not exits');
      }
      const carIndex = carsData.cars.indexOf(checkIfCarExist);
      carsData.cars[carIndex].status = req.body.status;
      return res.status(200).json({
        status: 200,
        data: carsData.cars[carIndex],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  }
}
export default UserController;
