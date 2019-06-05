import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class checkAuth {
  static async validate(req, res, next) {
    try {
      const token = req.headers.authorization;
      if (token) {
        const decoded = await jwt.verify(token, process.env.SECRET);
        if (!decoded) {
          throw new Error('Unauthorized invalid token');
        } else {
          req.userData = decoded;
          return next();
        }
      }
      throw new Error('Access denied.No token provided');
    } catch (err) {
      if (err.message === 'jwt malformed' || err.message === 'jwt expired') {
        res.status(401).json({
          status: 401,
          message: 'invalid or expired token',
        });
      } else {
        res.status(401).json({
          status: 401,
          message: err.message,
        });
      }
    }
  }
}
export default checkAuth;
