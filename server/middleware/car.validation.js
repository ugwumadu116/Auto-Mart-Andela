import checkCarInfo from '../helpers/carRequestChecker';

let validationError;
class CheckCarRequest {
  static async validatePostCar(req, res, next) {
    try {
      console.log(req.body)
      const result = await checkCarInfo.checkCar(req);
      validationError = result;
      if (Object.entries(result).length > 0) {
        throw new Error();
      }
      return next();
    } catch (err) {
      return res.status(400).json({
        status: 400,
        error: validationError,
      });
    }
  }
}

export default CheckCarRequest;
