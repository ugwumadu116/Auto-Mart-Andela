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

  static async findOrder(orderId, userId) {
    const sql = 'SELECT * from orders WHERE id = $1 AND buyer = $2 AND status = $3';
    const bindParameters = [orderId, userId, 'pending'];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    if (result.rowCount > 0) {
      return result.rows[0];
    }
    return false;
  }

  static async updatePrice(id, price) {
    const sql = 'UPDATE orders SET price_offered = $1 WHERE id = $2 RETURNING *';
    const bindParameters = [price, id];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    if (result.rowCount > 0) {
      return result.rows[0];
    }
    return false;
  }

  static async findSalesOrder(id) {
    const sql = 'SELECT users.first_name, users.email, users.last_name, cars.name, cars.img, orders.owner, orders.created_on, orders.status, orders.price, orders.price_offered FROM orders INNER JOIN cars ON orders.car_id = cars.id INNER JOIN users ON orders.buyer = users.id WHERE orders.owner = $1;';
    const bindParameters = [id];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    return result.rows;
  }

  static async findPurchaseOrder(id) {
    const sql = 'SELECT users.first_name, users.email, users.last_name, cars.name, cars.img, orders.owner, orders.created_on, orders.status, orders.price, orders.price_offered FROM orders INNER JOIN cars ON orders.car_id = cars.id INNER JOIN users ON orders.owner = users.id WHERE orders.buyer = $1;';
    const bindParameters = [id];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    return result.rows;
  }
}
export default OrderService;
