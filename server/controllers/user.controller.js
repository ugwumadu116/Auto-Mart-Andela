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
        first_name,
        last_name,
        email,
        password,
        address,
      } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      const user = {
        firstName: first_name.toLowerCase(),
        lastName: last_name.toLowerCase(),
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
          expiresIn: '12h',
        });
        return res.status(201).json({
          status: 201,
          data: {
            token: jwtTokenAdmin,
            id: registerAdmin.id,
            first_name: registerAdmin.first_name,
            last_name: registerAdmin.last_name,
            email: registerAdmin.email,
            address: registerAdmin.address,
            is_admin: registerAdmin.is_admin,
          },
        });
      }
      const result = await userService.createUser(user, false);
      const jwtToken = jwt.sign({ user: result.id, admin: false, info: `${result.first_name} ${result.last_name}` }, secret, {
        expiresIn: '12h',
      });
      return res.status(201).json({
        status: 201,
        data: {
          token: jwtToken,
          id: result.id,
          first_name: result.first_name,
          last_name: result.last_name,
          email: result.email,
          address: result.address,
          is_admin: result.is_admin,
        },
      });
    } catch (error) {
      return res.status(409).json({
        status: 409,
        error: error.message,
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
      const jwtToken = await jwt.sign({ user: checkIfUserExist[0].id, admin: checkIfUserExist[0].is_admin, info: `${checkIfUserExist[0].first_name} ${checkIfUserExist[0].last_name}` }, secret, {
        expiresIn: '12h',
      });
      return res.status(200).json({
        status: 200,
        data: {
          token: jwtToken,
          id: checkIfUserExist[0].id,
          first_name: checkIfUserExist[0].first_name,
          last_name: checkIfUserExist[0].last_name,
          email: checkIfUserExist[0].email,
          address: checkIfUserExist[0].address,
          is_admin: checkIfUserExist[0].is_admin,
        },
      });
    } catch (error) {
      if (error.message === 'invalid password or email') {
        return res.status(400).json({
          status: 400,
          error: error.message,
        });
      }
      return res.status(404).json({
        status: 404,
        error: error.message,
      });
    }
  }
}
export default UserController;
