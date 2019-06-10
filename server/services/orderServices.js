import carData from '../utils/dummyCarData';

class OrderService {
  static async findCar(id) {
    const carInfo = await carData.cars.find(car => car.id == id);
    if (carInfo) {
      return carInfo;
    }
    return false;
  }
}
export default OrderService;
