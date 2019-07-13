import chai from 'chai';
import chaiHTTP from 'chai-http';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import app from '../server/index';

const { assert, expect, use } = chai;

use(chaiHTTP);

const API_PREFIX = '/api/v1';

const jwtToken = jwt.sign({ user: 2, info: 'joel ugwumadu' }, 'secret', {
  expiresIn: 86400,
});
const fakeUser = jwt.sign({ user: 3, info: 'kim shawn' }, 'secret', {
  expiresIn: 86400,
});

const notRegisteredUser = jwt.sign({ user: 73, info: 'kim shawn' }, 'secret', {
  expiresIn: 86400,
});
const adminJwtToken = jwt.sign({ user: 1, info: 'admin admin' }, 'secret', {
  expiresIn: 86400,
});

before(async () => {
  await chai
    .request(app)
    .post(`${API_PREFIX}/car`)
    .set('token', jwtToken)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .field('manufacturer', 'General Motors (GM)')
    .field('name', 'Chevrolet')
    .field('model', '2018 model')
    .field('price', 32)
    .field('body_type', 'car')
    .field('state', 'new')
    .attach('image',
      fs.readFileSync('UI/images/car1.jpg'),
      'car1.jpg');
});

describe('Car Endpoint Tests', () => {
  it('POST /car/ - User POST car', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/car`)
      .set('token', jwtToken)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('manufacturer', 'General Motors (GM)')
      .field('name', 'Chevrolet')
      .field('model', '2018 model')
      .field('price', 132)
      .field('body_type', 'car')
      .field('state', 'new')
      .attach('image',
        fs.readFileSync('UI/images/car1.jpg'),
        'car1.jpg');
    expect(result).to.have.status(201);
    expect(result.body.status).to.eq(201);
    expect(result.body.data).to.have.property('id');
    expect(result.body.data).to.have.property('model');
    expect(result.body.data).to.have.property('body_type');
  });
  it('POST /car/ - User POST car', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/car`)
      .set('token', jwtToken)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('manufacturer', 'General Motors (GM)')
      .field('name', 'Chevrolet')
      .field('model', '2018 model')
      .field('price', 132)
      .field('body_type', 'car')
      .field('state', 'old')
      .attach('image',
        fs.readFileSync('UI/images/car1.jpg'),
        'car1.jpg');
    expect(result).to.have.status(201);
    expect(result.body.status).to.eq(201);
    expect(result.body.data).to.have.property('id');
    expect(result.body.data).to.have.property('model');
    expect(result.body.data).to.have.property('body_type');
  });
  it('POST /car/ - User POST car - fake token provided', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/car`)
      .set('token', notRegisteredUser)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('manufacturer', 'General Motors (GM)')
      .field('name', 'Chevrolet')
      .field('model', '2018 model')
      .field('price', 232)
      .field('body_type', 'car')
      .field('state', 'new')
      .attach('image',
        fs.readFileSync('UI/images/car1.jpg'),
        'car1.jpg');
    expect(result).to.have.status(401);
    expect(result.body.status).to.eq(401);
    assert.equal(result.body.error, 'User not registered');
  });
  it('POST /car/ - User POST car - fake token provided', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/car`)
      .set('token', 'jwtToken')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('manufacturer', 'General Motors (GM)')
      .field('name', 'Chevrolet')
      .field('model', '2018 model')
      .field('price', 232)
      .field('body_type', 'car')
      .field('state', 'new')
      .attach('image',
        fs.readFileSync('UI/images/car1.jpg'),
        'car1.jpg');
    expect(result).to.have.status(400);
    expect(result.body.status).to.eq(400);
    assert.equal(result.body.error, 'invalid or expired token');
  });
  it('POST /car/ - User POST car - token not provided', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/car`)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('manufacturer', 'General Motors (GM)')
      .field('name', 'Chevrolet')
      .field('model', '2018 model')
      .field('price', 232)
      .field('body_type', 'car')
      .field('state', 'new')
      .attach('image',
        fs.readFileSync('UI/images/car1.jpg'),
        'car1.jpg');
    expect(result).to.have.status(401);
    expect(result.body.status).to.eq(401);
    assert.equal(result.body.error, 'Access denied.No token provided');
  });
  it('POST /car/ - User POST car- fail due to incomplete fields', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/car`)
      .set('token', jwtToken)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('model', '2018 model')
      .field('price', 232)
      .field('body_type', 'car')
      .field('state', 'new')
      .attach('image',
        fs.readFileSync('UI/images/car1.jpg'),
        'car1.jpg');
    expect(result).to.have.status(400);
    expect(result.body.status).to.eq(400);
    expect(result.body.error).to.have.property('name');
    expect(result.body.error).to.have.property('manufacturer');
  });
  it('POST /car/ - User POST car- fail due to no fields', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/car`)
      .set('token', jwtToken)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .attach('image',
        fs.readFileSync('UI/images/car1.jpg'),
        'car1.jpg');
    expect(result).to.have.status(400);
    expect(result.body.status).to.eq(400);
    expect(result.body.error).to.have.property('name');
    expect(result.body.error).to.have.property('manufacturer');
    expect(result.body.error).to.have.property('body_type');
    expect(result.body.error).to.have.property('price');
  });
  it('DELETE /car/id - User DELETE car- pass', async () => {
    const result = await chai
      .request(app)
      .delete(`${API_PREFIX}/car/1`)
      .set('token', adminJwtToken);
    expect(result).to.have.status(200);
    expect(result.body.status).to.eq(200);
    assert.equal(result.body.data, 'Car Ad successfully deleted');
  });
  it('DELETE /car/id - User DELETE car- fail not admin', async () => {
    const result = await chai
      .request(app)
      .delete(`${API_PREFIX}/car/1`)
      .set('token', jwtToken);
    expect(result).to.have.status(401);
    expect(result.body.status).to.eq(401);
    assert.equal(result.body.error, 'Unauthorized only admin can delete');
  });
  it('DELETE /car/id - User DELETE car- fail car does not exits', async () => {
    const result = await chai
      .request(app)
      .delete(`${API_PREFIX}/car/111`)
      .set('token', adminJwtToken);
    expect(result).to.have.status(404);
    expect(result.body.status).to.eq(404);
    assert.equal(result.body.error, 'Car with that id doest not exits');
  });
  it('DELETE /car/id - User DELETE car- fail invalid car id', async () => {
    const result = await chai
      .request(app)
      .delete(`${API_PREFIX}/car/abc`)
      .set('token', adminJwtToken);
    expect(result).to.have.status(400);
    expect(result.body.status).to.eq(400);
    expect(result.body.error).to.have.property('car_id');
  });
  it('GET /car?body_type=car - User GET cars with body_type=car', async () => {
    const result = await chai
      .request(app)
      .get(`${API_PREFIX}/car?body_type=car`)
      .set('authorization', jwtToken);
    expect(result).to.have.status(200);
    expect(result.body.status).to.eq(200);
    expect(result.body.data).to.be.an('array');
  });
  it('GET /car?body_type=car - User GET cars with body_type=car', async () => {
    const result = await chai
      .request(app)
      .get(`${API_PREFIX}/car?body_type=car`)
      .set('token', notRegisteredUser);
    expect(result).to.have.status(401);
    expect(result.body.status).to.eq(401);
  });
  it('GET /car?body_type=car - User GET cars with body_type=car fail wrong token', async () => {
    const result = await chai
      .request(app)
      .get(`${API_PREFIX}/car?body_type=car`)
      .set('token', 'jwtToken');
    expect(result).to.have.status(400);
    expect(result.body.status).to.eq(400);
    assert.equal(result.body.error, 'invalid or expired token');
  });
  it('GET /car?status=available - User GET cars with status=available', async () => {
    const result = await chai
      .request(app)
      .get(`${API_PREFIX}/car?status=available`)
      .set('token', jwtToken);
    expect(result).to.have.status(200);
    expect(result.body.status).to.eq(200);
    expect(result.body.data).to.be.an('array');
  });
  it('GET /car?status=available&min_price=100&max_price=1000 - User GET cars of specified price range', async () => {
    const result = await chai
      .request(app)
      .get(`${API_PREFIX}/car?status=available&min_price=100&max_price=1000`)
      .set('token', jwtToken);
    expect(result).to.have.status(200);
    expect(result.body.status).to.eq(200);
    expect(result.body.data).to.be.an('array');
  });
  it('GET /car/2 - User GET a specific car', async () => {
    const result = await chai
      .request(app)
      .get(`${API_PREFIX}/car/2`)
      .set('token', jwtToken);
    expect(result).to.have.status(200);
    expect(result.body.status).to.eq(200);
    expect(result.body.data).to.have.property('name');
    expect(result.body.data).to.have.property('manufacturer');
    expect(result.body.data).to.have.property('body_type');
    expect(result.body.data).to.have.property('price');
  });
  it('GET /car/car_id - User GET a specific car', async () => {
    const result = await chai
      .request(app)
      .get(`${API_PREFIX}/car/3333`)
      .set('token', jwtToken);
    expect(result).to.have.status(404);
    expect(result.body.status).to.eq(404);
    assert.equal(result.body.error, 'Car with that id doest not exits');
  });
  it('PATCH /car/car_id/price - User update a specific car price', async () => {
    const result = await chai
      .request(app)
      .patch(`${API_PREFIX}/car/2/price`)
      .set('token', jwtToken)
      .send({
        price: '1000000',
      });
    expect(result).to.have.status(200);
    expect(result.body.status).to.eq(200);
    expect(result.body.data).to.have.property('name');
    expect(result.body.data).to.have.property('manufacturer');
    expect(result.body.data).to.have.property('body_type');
    expect(result.body.data).to.have.property('price');
  });
  it('PATCH /car/car_id/price - User update a specific car price / FAIL', async () => {
    const result = await chai
      .request(app)
      .patch(`${API_PREFIX}/car/500/price`)
      .set('token', jwtToken)
      .send({
        price: '1000000',
      });
    expect(result).to.have.status(400);
    expect(result.body.status).to.eq(400);
    assert.equal(result.body.error, 'Car with that id doest not exits');
  });
  it('PATCH /car/car_id/price - User update a specific car price / FAIL', async () => {
    const result = await chai
      .request(app)
      .patch(`${API_PREFIX}/car/2/price`)
      .set('token', adminJwtToken)
      .send({
        price: '1000000',
      });
    expect(result).to.have.status(400);
    expect(result.body.status).to.eq(400);
    assert.equal(result.body.error, 'you cannot update the price of car you do not own');
  });
  it('PATCH /car/car_id/status - User update a specific car status fail car not owned ny user', async () => {
    const result = await chai
      .request(app)
      .patch(`${API_PREFIX}/car/3/status`)
      .set('token', fakeUser)
      .send({
        status: 'sold',
      });
    expect(result).to.have.status(400);
    expect(result.body.status).to.eq(400);
    assert.equal(result.body.error, 'you cannot update the status of car you do not own');
  });
  it('PATCH /car/car_id/status - User update a specific car status', async () => {
    const result = await chai
      .request(app)
      .patch(`${API_PREFIX}/car/3/status`)
      .set('token', jwtToken)
      .send({
        status: 'sold',
      });
    expect(result).to.have.status(200);
    expect(result.body.status).to.eq(200);
    expect(result.body.data).to.have.property('name');
    expect(result.body.data).to.have.property('manufacturer');
    expect(result.body.data).to.have.property('body_type');
    expect(result.body.data).to.have.property('price');
  });
  it('PATCH /car/car_id/status - User update a specific car price / FAIL', async () => {
    const result = await chai
      .request(app)
      .patch(`${API_PREFIX}/car/500/status`)
      .set('token', jwtToken)
      .send({
        status: 'sold',
      });
    expect(result).to.have.status(400);
    expect(result.body.status).to.eq(400);
    assert.equal(result.body.error, 'Car with that id doest not exits');
  });
  it('GET /car/car - User (admin) can get sold and unsold cars', async () => {
    const result = await chai
      .request(app)
      .get(`${API_PREFIX}/car`)
      .set('token', adminJwtToken);
    expect(result).to.have.status(200);
    expect(result.body.status).to.eq(200);
    expect(result.body.data[0]).to.have.property('name');
    expect(result.body.data[0]).to.have.property('manufacturer');
    expect(result.body.data[0]).to.have.property('body_type');
    expect(result.body.data[0]).to.have.property('price');
  });
  it('GET /car/car - User not registered', async () => {
    const result = await chai
      .request(app)
      .get(`${API_PREFIX}/car`)
      .set('token', notRegisteredUser);
    expect(result).to.have.status(401);
    expect(result.body.status).to.eq(401);
    assert.equal(result.body.error, 'User not registered');
  });
  it('GET /car/car - User can get unsold cars', async () => {
    const result = await chai
      .request(app)
      .get(`${API_PREFIX}/car`)
      .set('token', jwtToken);
    expect(result).to.have.status(200);
    expect(result.body.status).to.eq(200);
    expect(result.body.data[0]).to.have.property('name');
    expect(result.body.data[0]).to.have.property('manufacturer');
    expect(result.body.data[0]).to.have.property('body_type');
    expect(result.body.data[0]).to.have.property('price');
  });
});
