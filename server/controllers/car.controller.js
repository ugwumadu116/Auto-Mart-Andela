// import cloudinary from '../config/cloudinary';
import CarServices from '../services/car.services';

class carController {
  static async createCar(req, res) {
    try {
      const checkIfUserExist = await CarServices.checkUser(req.userData.user);
      if (!checkIfUserExist) {
        throw new Error('User not registered');
      }
      // const uploadImage = await cloudinary.uploader.upload(req.file.path);
      const newCar = await CarServices.registerCar(req);
      return res.status(201).json({
        status: 201,
        data: {
          id: newCar[0].id,
          name: newCar[0].name,
          image_url: newCar[0].image,
          price: newCar[0].price,
          model: newCar[0].model,
          manufacturer: newCar[0].manufacturer,
          owner: newCar[0].owner,
          created_on: newCar[0].created_on,
          status: newCar[0].status,
          body_type: newCar[0].body_type,
        },
      });
    } catch (error) {
      if (error.message === 'User not registered') {
        return res.status(401).json({
          status: 401,
          error: error.message,
        });
      }
      return res.status(409).json({
        status: 409,
        error: error.message,
      });
    }
  }

  static async deleteCar(req, res) {
    try {
      const isAdmin = await CarServices.checkIfUserIsAdmin(req.userData.user);
      if (!isAdmin) {
        throw new Error('Unauthorized only admin can delete');
      }
      const checkIfCarExist = await CarServices.findCar(req.params.car_id);
      if (!checkIfCarExist) {
        throw new Error('Car with that id doest not exits');
      }
      await CarServices.deleteSingleCar(checkIfCarExist.id);
      // await cloudinary.uploader.destroy(checkIfCarExist.image_id);
      return res.status(200).json({
        status: 200,
        data: 'Car Ad successfully deleted',
      });
    } catch (error) {
      if (error.message === 'Car with that id doest not exits') {
        return res.status(404).json({
          status: 404,
          error: error.message,
        });
      }
      return res.status(401).json({
        status: 401,
        error: error.message,
      });
    }
  }

  static async getCars(req, res) {
    try {
      const checkIfUserExist = await CarServices.checkUser(req.userData.user);
      if (!checkIfUserExist) {
        throw new Error('User not registered');
      }
      if (Object.keys(req.query).length === 0) {
        const allCars = await CarServices.getAllCars();
        return res.status(200).json({
          status: 200,
          data: allCars,
        });
      }
      const queryObj = req.query;
      if ('min_price' in queryObj) {
        const myCars = await CarServices.getAllCars();
        const carRange = myCars.filter(car => car.status === 'available' && Number(car.price) >= queryObj['min_price'] && Number(car.price) <= queryObj['max_price']);
        return res.status(200).json({
          status: 200,
          data: carRange,
        });
      }
      const queryKeys = Object.keys(queryObj);
      let sql = 'SELECT * from cars';
      sql += ' WHERE ' + queryKeys.map((key, i) => `${key} = $${i + 1}`).join(' AND ');
      const bindParameters = [];
      queryKeys.forEach(item => bindParameters.push(queryObj[item]));
      const queryCars = await CarServices.filterCars(sql, bindParameters);
      return res.status(200).json({
        status: 200,
        data: queryCars,
      });
    } catch (error) {
      if (error.message === 'User not registered') {
        return res.status(401).json({
          status: 401,
          error: error.message,
        });
      }
      return res.status(404).json({
        status: 404,
        error: error.message,
      });
    }
  }

  static async getSingleCar(req, res) {
    try {
      const checkIfUserExist = await CarServices.checkUser(req.userData.user);
      if (!checkIfUserExist) {
        throw new Error('User not registered');
      }
      const checkIfCarExist = await CarServices.findCar(req.params.car_id);
      if (!checkIfCarExist) {
        throw new Error('Car with that id doest not exits');
      }
      return res.status(200).json({
        status: 200,
        data: checkIfCarExist,
      });
    } catch (error) {
      if (error.message === 'User not registered') {
        return res.status(401).json({
          status: 401,
          error: error.message,
        });
      }
      return res.status(404).json({
        status: 404,
        error: error.message,
      });
    }
  }

  static async updateCarPrice(req, res) {
    try {
      console.log(req.body.price, 'JOEL PRICE IS HERE');
      const checkIfUserExist = await CarServices.checkUser(req.userData.user);
      if (!checkIfUserExist) {
        throw new Error('User not registered');
      }
      const checkIfCarExist = await CarServices.findCar(req.params.car_id);
      if (!checkIfCarExist) {
        throw new Error('Car with that id doest not exits');
      }
      // if (checkIfCarExist.owner !== req.userData.user) {
      //   throw new Error('you cannot update the price of car you do not own');
      // }
      const updatedCar = await CarServices.updatePrice(req.params.car_id, req.body.price);
      return res.status(200).json({
        status: 200,
        data: {
          ...updatedCar,
          email: checkIfUserExist.email,
        },
      });
    } catch (error) {
      if (error.message === 'User not registered') {
        return res.status(401).json({
          status: 401,
          error: error.message,
        });
      }
      return res.status(400).json({
        status: 400,
        error: error.message,
      });
    }
  }

  static async updateCarStatus(req, res) {
    try {
      const checkIfUserExist = await CarServices.checkUser(req.userData.user);
      if (!checkIfUserExist) {
        throw new Error('User not registered');
      }
      const checkIfCarExist = await CarServices.findCar(req.params.car_id);
      if (!checkIfCarExist) {
        throw new Error('Car with that id doest not exits');
      }
      if (checkIfCarExist.owner !== req.userData.user) {
        throw new Error('you cannot update the status of car you do not own');
      }
      if (checkIfCarExist.status === 'sold') {
        throw new Error('Car is already sold');
      }
      const updatedCar = await CarServices.updateStatus(req.params.car_id, req.body.status);
      return res.status(200).json({
        status: 200,
        data: {
          ...updatedCar,
          email: checkIfUserExist.email,
        },
      });
    } catch (error) {
      if (error.message === 'User not registered') {
        return res.status(401).json({
          status: 401,
          error: error.message,
        });
      }
      return res.status(400).json({
        status: 400,
        error: error.message,
      });
    }
  }
}
export default carController;
