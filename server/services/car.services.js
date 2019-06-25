import db from '../config/db';

class CarService {
  static async registerCar(req, uploadImage) {
    const img = uploadImage.secure_url;
    const imgID = uploadImage.public_id;
    const {
      name,
      model,
      price,
      body_type,
      state,
      manufacturer,
    } = req.body;
    const userId = req.userData.user;
    const sql = 'INSERT INTO cars (name, img, img_id, price, model, manufacturer, owner, status, state, body_type) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
    const bindParameters = [name, img, imgID, price, model, manufacturer, userId, 'available', state, body_type];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    return result.rows;
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

  static async checkIfUserIsAdmin(id) {
    const sql = 'SELECT * from users WHERE id = $1';
    const bindParameters = [id];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    if (result.rows.length === 0) {
      return false;
    }
    if (result.rows[0].is_admin) {
      return true;
    }
    return false;
  }

  static async findCar(id) {
    const sql = 'SELECT cars.*, users.first_name, users.last_name FROM cars LEFT JOIN users ON cars.owner = users.id WHERE cars.id = $1;';
    const bindParameters = [id];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    if (result.rowCount > 0) {
      return result.rows[0];
    }
    return false;
  }

  static async deleteSingleCar(id) {
    const sql = 'DELETE from cars WHERE id = $1';
    const bindParameters = [id];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    if (result.rowCount > 0) {
      return true;
    }
  }

  static async filterCars(sql, bindParameters) {
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    return result.rows;
  }

  static async getAllCars() {
    const sql = 'SELECT * from cars';
    const client = await db.connect();
    const result = await client.query(sql);
    client.release();
    return result.rows;
  }
}
export default CarService;