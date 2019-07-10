import validation from '../helpers/userRequestChecker';

class checkRequestInput {
  static async validateUserReq(req, res, next) {
    try {
      await validation.checkRequest(req);
      return next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: error.mapped(),
      });
    }
  }
}

export default checkRequestInput;
