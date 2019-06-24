import cloudinary from '../config/cloudinary';
import CarServices from '../services/car.services';

class carController {
  static async createCar(req, res) {
    try {
      const checkIfUserExist = await CarServices.checkUser(req.userData.user);
      if (!checkIfUserExist) {
        throw new Error('User not registered');
      }
      const uploadImage = await cloudinary.uploader.upload(req.file.path);
      const newCar = await CarServices.registerCar(req, uploadImage);
      return res.status(201).json({
        status: 201,
        data: {
          id: newCar[0].id,
          name: newCar[0].name,
          img: newCar[0].img,
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
      return res.status(409).json({
        status: 409,
        message: error.message,
      });
    }
  }
}
export default carController;
