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
        expiresIn: '6h',
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

  static async loginUser(req, res) {
    try {
      const {
        email,
        password,
      } = req.body;
      const checkIfUserExist = await userService.findUser(email);
      if (!checkIfUserExist) {
        throw new Error('User not registered please signup');
      }
      const checkPassword = await bcrypt.compare(password, checkIfUserExist.password);
      if (!checkPassword) {
        throw new Error('invalid password or email');
      }
      const jwtToken = await jwt.sign({ user: checkIfUserExist.id }, secret, {
        expiresIn: '6h',
      });
      return res.status(200).json({
        status: 200,
        data: [{
          token: jwtToken,
          id: checkIfUserExist.id,
          firstName: checkIfUserExist.firstName,
          lastName: checkIfUserExist.lastName,
          email: checkIfUserExist.email,
          address: checkIfUserExist.address,
        }],
      });
    } catch (error) {
      if (error.message === 'invalid password or email') {
        return res.status(400).json({
          status: 400,
          message: error.message,
        });
      }
      return res.status(404).json({
        status: 404,
        message: error.message,
      });
    }
  }
}
export default UserController;
