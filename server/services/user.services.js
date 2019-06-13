import db from '../config/db';

class UserService {
  static async createUser(user, isAdmin) {
    const {
      email,
      firstName,
      lastName,
      hashPassword,
      address,
    } = user;
    if (isAdmin) {
      const sqlAdmin = 'INSERT INTO users (first_name, last_name, email, password, address, is_admin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
      const bindParametersAdmin = [firstName, lastName, email, hashPassword, address, true];
      const clientAdmin = await db.connect();
      const resultAdmin = await clientAdmin.query(sqlAdmin, bindParametersAdmin);
      clientAdmin.release();
      return resultAdmin.rows[0];
    }
    const sql = 'INSERT INTO users (first_name, last_name, email, password, address) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const bindParameters = [firstName, lastName, email, hashPassword, address];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    return result.rows[0];
  }

  static async checkUser(email) {
    const sql = 'SELECT from users WHERE email = $1';
    const bindParameters = [email];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    return result.rowCount;
  }

  static async findUser(email) {
    const sql = 'SELECT * from users WHERE email = $1';
    const bindParameters = [email];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    return result.rows;
  }
}
export default UserService;
