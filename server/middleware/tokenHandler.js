import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class checkAuth {
  static async validate(req, res, next) {
    try {
      const token = req.headers.token || req.headers.authorization;
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
      if (err.message === 'Unauthorized invalid token') {
        res.status(400).json({
          status: 400,
          error: 'Unauthorized invalid token',
        });
      } else if (err.message === 'jwt malformed' || err.message === 'jwt expired') {
        res.status(400).json({
          status: 400,
          error: 'invalid or expired token',
        });
      } else {
        res.status(401).json({
          status: 401,
          error: err.message,
        });
      }
    }
  }
}
export default checkAuth;
