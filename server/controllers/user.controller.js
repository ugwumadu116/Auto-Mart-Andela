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
      const checkIfUserExist = await userService.checkUser(user.email);
      if (checkIfUserExist > 0) {
        throw new Error('User already registered please sign in');
      }
      if (user.email === 'admin@gmail.com') {
        const registerAdmin = await userService.createUser(user, true);
        const jwtTokenAdmin = jwt.sign({ user: registerAdmin.id, admin: true }, secret, {
          expiresIn: '6h',
        });
        return res.status(201).json({
          status: 201,
          data: [{
            token: jwtTokenAdmin,
            id: registerAdmin.id,
            firstName: registerAdmin.first_name,
            lastName: registerAdmin.last_name,
            email: registerAdmin.email,
            address: registerAdmin.address,
            isAdmin: registerAdmin.is_admin,
          }],
        });
      }
      const result = await userService.createUser(user, false);
      const jwtToken = jwt.sign({ user: result.id, admin: false, info: `${result.first_name} ${result.last_name}` }, secret, {
        expiresIn: '6h',
      });
      return res.status(201).json({
        status: 201,
        data: [{
          token: jwtToken,
          id: result.id,
          firstName: result.first_name,
          lastName: result.last_name,
          email: result.email,
          address: result.address,
          isAdmin: result.is_admin,
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
