import userData from '../utils/dummyUserData';
import carData from '../utils/dummyCarData';

class CarService {
  static async CheckIfUserIsAdmin(id) {
    const userInfo = await userData.user.find(user => user.id === id);
    if (userInfo.isAdmin) {
      return true;
    }
    return false;
  }

  static async findCar(id) {
    const carInfo = await carData.cars.find(car => car.id == id);
    if (carInfo) {
      return carInfo;
    }
    return false;
  }
}
export default CarService;
