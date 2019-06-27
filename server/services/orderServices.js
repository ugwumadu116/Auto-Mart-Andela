import db from '../config/db';

class OrderService {
  static async findCar(id) {
    const sql = 'SELECT * from cars WHERE id = $1';
    const bindParameters = [id];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    if (result.rowCount > 0) {
      return result.rows[0];
    }
    return false;
  }

  static async createOrder(req, carDetails) {
    const {
      car_id,
      price_offered,
    } = req.body;
    const userId = req.userData.user;
    const sql = 'INSERT INTO orders (car_id, buyer, owner, status, price_offered, price) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    const bindParameters = [car_id, userId, carDetails.owner, 'pending', price_offered, carDetails.price];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    return result.rows[0];
  }

  static async checkUser(id) {
    const sql = 'SELECT * from users WHERE id = $1';
    const bindParameters = [id];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    if (result.rowCount > 0) {
      return true;
    }
    return false;
  }
}
export default OrderService;
