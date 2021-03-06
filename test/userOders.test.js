import chai from 'chai';
import chaiHTTP from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../server/index';

const { assert, expect, use } = chai;

use(chaiHTTP);

const API_PREFIX = '/api/v1';

const jwtToken = jwt.sign({ user: 2, info: 'joel ugwumadu' }, 'secret', {
  expiresIn: 86400,
});

const unregisteredToken = jwt.sign({ user: 56, info: 'none none' }, 'secret', {
  expiresIn: 86400,
});

before(async () => {
  await chai
    .request(app)
    .post(`${API_PREFIX}/order`)
    .set('token', jwtToken)
    .send({
      car_id: 2,
      amount: 1000,
    });
});


describe('Order Endpoint Tests', () => {
  it('POST /order/ - User POST order', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/order`)
      .set('token', jwtToken)
      .send({
        car_id: 2,
        amount: 1000,
      });
    expect(result).to.have.status(201);
    expect(result.body.status).to.eq(201);
    expect(result.body.data).to.have.property('id');
    expect(result.body.data).to.have.property('price_offered');
    expect(result.body.data).to.have.property('price');
    expect(result.body.data).to.have.property('buyer');
    expect(result.body.data).to.have.property('status');
  });
  it('POST /order/ - User POST order / fail wrong id', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/order`)
      .set('token', jwtToken)
      .send({
        car_id: 222,
        amount: 1000,
      });
    expect(result).to.have.status(409);
    expect(result.body.status).to.eq(409);
    assert.equal(result.body.error, 'Car with that id doest not exits');
  });
  it('POST /order/ - User POST order / fail unregistered user', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/order`)
      .set('token', unregisteredToken)
      .send({
        car_id: 222,
        amount: 1000,
      });
    expect(result).to.have.status(409);
    expect(result.body.status).to.eq(409);
    assert.equal(result.body.error, 'User not registered');
  });
  it('POST /order/ - User POST order / fail already sold', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/order`)
      .set('token', jwtToken)
      .send({
        car_id: 3,
        amount: 1000,
      });
    expect(result).to.have.status(409);
    expect(result.body.status).to.eq(409);
    assert.equal(result.body.error, 'this car has been sold');
  });
  it('PATCH /order/ - User update order price', async () => {
    const result = await chai
      .request(app)
      .patch(`${API_PREFIX}/order/1/price`)
      .set('token', jwtToken)
      .send({
        price: 156,
      });
    expect(result).to.have.status(200);
    expect(result.body.status).to.eq(200);
    expect(result.body.data).to.have.property('id');
    expect(result.body.data).to.have.property('new_price_offered');
    expect(result.body.data).to.have.property('old_price_offered');
    expect(result.body.data).to.have.property('buyer');
    expect(result.body.data).to.have.property('status');
  });
  it('PATCH /order/ - User update order price fail wrong id', async () => {
    const result = await chai
      .request(app)
      .patch(`${API_PREFIX}/order/234/price`)
      .set('token', jwtToken)
      .send({
        price: 1000,
      });
    expect(result).to.have.status(400);
    expect(result.body.status).to.eq(400);
    assert.equal(result.body.error, 'You cant update the price of this order');
  });
  it('GET /order/sale - User GET cars he wants to sale', async () => {
    const result = await chai
      .request(app)
      .get(`${API_PREFIX}/order/sale`)
      .set('token', jwtToken);
    expect(result).to.have.status(200);
    expect(result.body.status).to.eq(200);
    expect(result.body.data).to.be.an('array');
  });
  it('GET /order/sale - User GET cars he wants to sale failed User not registered', async () => {
    const result = await chai
      .request(app)
      .get(`${API_PREFIX}/order/sale`)
      .set('token', unregisteredToken);
    expect(result).to.have.status(400);
    expect(result.body.status).to.eq(400);
    assert.equal(result.body.error, 'User not registered');
  });
  it('GET /order/purchase - User GET cars he wants to buy', async () => {
    const result = await chai
      .request(app)
      .get(`${API_PREFIX}/order/purchase`)
      .set('token', jwtToken);
    expect(result).to.have.status(200);
    expect(result.body.status).to.eq(200);
    expect(result.body.data).to.be.an('array');
  });
  it('GET /order/purchase - User GET cars he wants to buy failed User not registered', async () => {
    const result = await chai
      .request(app)
      .get(`${API_PREFIX}/order/purchase`)
      .set('token', unregisteredToken);
    expect(result).to.have.status(400);
    expect(result.body.status).to.eq(400);
    assert.equal(result.body.error, 'User not registered');
  });
});
