import checkCarInfo from '../helpers/carRequestChecker';

let err;
class CheckCarRequest {
  static async validatePostCar(req, res, next) {
    try {
      const result = await checkCarInfo.checkCar(req);
      err = result;
      if (Object.entries(result).length > 0) {
        throw new Error();
      }
      return next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  }
}

export default CheckCarRequest;
