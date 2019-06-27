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
    .set('authorization', jwtToken)
    .send({
      car_id: 2,
      price_offered: 1000,
    });
});


describe('Order Endpoint Tests', () => {
  it('POST /order/ - User POST order', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/order`)
      .set('authorization', jwtToken)
      .send({
        car_id: 2,
        price_offered: 1000,
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
      .set('authorization', jwtToken)
      .send({
        car_id: 222,
        price_offered: 1000,
      });
    expect(result).to.have.status(409);
    expect(result.body.status).to.eq(409);
    assert.equal(result.body.message, 'Car with that id doest not exits');
  });
  it('POST /order/ - User POST order / fail unregistered user', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/order`)
      .set('authorization', unregisteredToken)
      .send({
        car_id: 222,
        price_offered: 1000,
      });
    expect(result).to.have.status(409);
    expect(result.body.status).to.eq(409);
    assert.equal(result.body.message, 'User not registered');
  });
  it('POST /order/ - User POST order / fail already sold', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/order`)
      .set('authorization', jwtToken)
      .send({
        car_id: 3,
        price_offered: 1000,
      });
    expect(result).to.have.status(409);
    expect(result.body.status).to.eq(409);
    assert.equal(result.body.message, 'this car has been sold');
  });
});
