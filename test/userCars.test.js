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
    .set('authorization', jwtToken)
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
      .set('authorization', jwtToken)
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
      .set('authorization', jwtToken)
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
      .set('authorization', notRegisteredUser)
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
    expect(result).to.have.status(409);
    expect(result.body.status).to.eq(409);
    assert.equal(result.body.message, 'User not registered');
  });
  it('POST /car/ - User POST car - fake token provided', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/car`)
      .set('authorization', 'jwtToken')
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
    assert.equal(result.body.message, 'invalid or expired token');
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
    assert.equal(result.body.message, 'Access denied.No token provided');
  });
  it('POST /car/ - User POST car- fail due to incomplete fields', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/car`)
      .set('authorization', jwtToken)
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
    expect(result.body.message).to.have.property('name');
    expect(result.body.message).to.have.property('manufacturer');
  });
  it('POST /car/ - User POST car- fail due to no fields', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/car`)
      .set('authorization', jwtToken)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .attach('image',
        fs.readFileSync('UI/images/car1.jpg'),
        'car1.jpg');
    expect(result).to.have.status(400);
    expect(result.body.status).to.eq(400);
    expect(result.body.message).to.have.property('name');
    expect(result.body.message).to.have.property('manufacturer');
    expect(result.body.message).to.have.property('body_type');
    expect(result.body.message).to.have.property('price');
  });
});
