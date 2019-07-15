import db from '../config/db';

class CarService {
  static async registerCar(req) {
    const {
      model,
      body_type,
      state,
      manufacturer,
      img_url,
    } = req.body;


    //     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjozLCJhZG1pbiI6ZmFsc2UsImluZm8iOiJmaXJzdG5hbWUgbGFzdG5hbWUiLCJpYXQiOjE1NjMxODc0MzcsImV4cCI6MTU2MzIzMDYzN30.j6Xyym9QOGmwq2Afjvf1sNJiEP_qeIFgqBbQWZMg_Rk',
    //  {
    //    state: 'new',
    //  status: 'available',
    //  price: 1500000,
    //  model: 'Camry',
    //  year: 2000,
    //  manufacturer: 'Toyota',
    //  body_type: 'car',
    //  fuel_type: 'Petrol',
    //  fuel_cap: 300,
    //  transmission_type: 'Automatic',
    //  mileage: 3400,
    //  color: 'Red',
    //  description: 'Other stories about the car goes here',
    //  doors: 4,
    //  ac: true,
    //  tinted_windows: true,
    //  arm_rest: false,
    //  air_bag: false,
    //  fm_radio: true,
    //  dvd_player: false,
    //  img_url: 'https://google.com' }
    const img = img_url;
    const imgID = img_url;
    const userId = req.userData.user;
    const sql = 'INSERT INTO cars (image, image_id, price, model, manufacturer, owner, status, state, body_type) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
    const bindParameters = [img, imgID, 5000, model, manufacturer, userId, 'available', state, body_type];
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
      return result.rows[0];
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

  static async getAvailableCars() {
    const sql = 'SELECT * from cars WHERE status = $1';
    const bindParameters = ['available'];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    return result.rows;
  }

  static async updatePrice(id, price) {
    const sql = 'UPDATE cars SET price = $1 WHERE id = $2 RETURNING *';
    const bindParameters = [price, id];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    if (result.rowCount > 0) {
      return result.rows[0];
    }
  }

  static async updateStatus(id, status) {
    const sql = 'UPDATE cars SET status = $1 WHERE id = $2 RETURNING *';
    const bindParameters = [status, id];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    if (result.rowCount > 0) {
      return result.rows[0];
    }
    return false;
  }
}
export default CarService;
