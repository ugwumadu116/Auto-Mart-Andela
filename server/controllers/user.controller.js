import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import userService from '../services/user.services';

dotenv.config();
const secret = process.env.SECRET;
class UserController {
  static async registerUser(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        address,
      } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      const user = {
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        email: email.toLowerCase(),
        hashPassword,
        address: address.toLowerCase(),
      };
      const createdUser = await userService.createUser(user);
      const jwtToken = jwt.sign({ user: createdUser.id }, secret, {
        expiresIn: '1h',
      });
      return res.status(201).json({
        status: 201,
        data: [{
          token: jwtToken,
          id: createdUser.id,
          firstName: createdUser.firstName,
          lastName: createdUser.lastName,
          email: createdUser.email,
          address: createdUser.address,
        }],
      });
    } catch (error) {
      return res.status(409).json({
        status: 409,
        message: error.message,
      });
    }
  }
}
export default UserController;
