import userData from '../utils/dummyUserData';
import User from '../models/user.model';

class UserService {
  static async createUser(user) {
    const {
      email,
      firstName,
      lastName,
      hashPassword,
      address,
    } = user;
    const findUser = await userData.user.find(userInfo => userInfo.email === email);
    if (findUser) {
      throw Error('User with that email is already registered');
    } else {
      const newUser = new User();
      newUser.id = userData.user.length + 1;
      newUser.email = email;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.password = hashPassword;
      newUser.address = address;
      userData.user.push(newUser);
      return newUser;
    }
  }

  static findUser(email) {
    return userData.user.find(userInfo => userInfo.email === email);
  }
}
export default UserService;
