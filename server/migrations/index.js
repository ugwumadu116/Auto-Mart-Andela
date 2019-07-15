import pool from '../config/db';

pool.on('connect', () => {
  console.log('Connected');
});

const drop = () => {
  const usersTable = 'DROP TABLE IF EXISTS users CASCADE';
  const carsTable = 'DROP TABLE IF EXISTS cars CASCADE';
  const ordersTable = 'DROP TABLE IF EXISTS orders CASCADE';
  const dropTables = `${usersTable};${carsTable};${ordersTable};`;

  pool.query(`${dropTables}`, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Tables dropped');
    }
    pool.end();
  });
};

const create = () => {
  const usersTable = `CREATE TABLE IF NOT EXISTS
  users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    address VARCHAR(1600),
    is_admin BOOLEAN DEFAULT FALSE
  )`;
  // cars table
  const carsTable = `CREATE TABLE IF NOT EXISTS
  cars(
    id SERIAL PRIMARY KEY,
    image VARCHAR(1600) NOT NULL,
    image_id VARCHAR(1600) NOT NULL,
    price BIGINT NOT NULL,
    model VARCHAR(1600) NOT NULL,
    manufacturer VARCHAR(1600) NOT NULL,
    owner INTEGER NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(150) NOT NULL,
    state VARCHAR(150) NOT NULL,
    body_type VARCHAR(150) NOT NULL,
    CONSTRAINT fk_owner FOREIGN KEY (owner) REFERENCES  users (id)
  )`;
  // order table
  const ordersTable = `CREATE TABLE IF NOT EXISTS
  orders(
    id SERIAL PRIMARY KEY,
    car_id INTEGER NOT NULL,
    buyer INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL,
    owner INTEGER NOT NULL,
    price_offered BIGINT NOT NULL,
    price BIGINT NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_buyer FOREIGN KEY (buyer) REFERENCES  users (id),
    CONSTRAINT fk_car_id FOREIGN KEY (car_id) REFERENCES  cars (id) ON DELETE CASCADE
  )`;

  const migrationQueries = `${usersTable};${carsTable};${ordersTable};`;
  pool.query(`${migrationQueries}`, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Database migration successfully executed!');
    }
    pool.end();
  });
};

export { drop, create };

// eslint-disable-next-line eol-last
require('make-runnable/custom')({
  printOutputFrame: false,
});
