import carData from '../utils/dummyCarData';

class OrderService {
  static async findCar(id) {
    console.log(id);
    const carInfo = await carData.cars.find(car => car.id == id);
    if (carInfo) {
      return carInfo;
    }
    return false;
  }
}
export default OrderService;
