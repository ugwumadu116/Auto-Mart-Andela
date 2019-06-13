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
        const jwtTokenAdmin = jwt.sign({ user: registerAdmin.id }, secret, {
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
      const jwtToken = jwt.sign({ user: result.id, info: `${result.first_name} ${result.last_name}` }, secret, {
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

  static async loginUser(req, res) {
    try {
      const {
        email,
        password,
      } = req.body;
      const checkIfUserExist = await userService.findUser(email);
      if (checkIfUserExist.length <= 0) {
        throw new Error('User not registered please signup');
      }
      const checkPassword = await bcrypt.compare(password, checkIfUserExist[0].password);
      if (!checkPassword) {
        throw new Error('invalid password or email');
      }
      const jwtToken = await jwt.sign({ user: checkIfUserExist[0].id, info: `${checkIfUserExist[0].first_name} ${checkIfUserExist[0].last_name}` }, secret, {
        expiresIn: '6h',
      });
      return res.status(200).json({
        status: 200,
        data: [{
          token: jwtToken,
          id: checkIfUserExist[0].id,
          firstName: checkIfUserExist[0].first_name,
          lastName: checkIfUserExist[0].last_name,
          email: checkIfUserExist[0].email,
          address: checkIfUserExist[0].address,
          isAdmin: checkIfUserExist[0].is_admin,
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
