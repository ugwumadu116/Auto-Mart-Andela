import chai from 'chai';
import chaiHTTP from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../server/index';

const { assert, expect, use } = chai;

use(chaiHTTP);

const API_PREFIX = '/api/v1';

const jwtToken = jwt.sign({ user: 2 }, 'secret', {
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
  it('PATCH /order/ - User update order price', async () => {
    const result = await chai
      .request(app)
      .patch(`${API_PREFIX}/order/2/price`)
      .set('authorization', jwtToken)
      .send({
        price_offered: 1000,
      });
    expect(result).to.have.status(200);
    expect(result.body.status).to.eq(200);
    expect(result.body.data).to.have.property('id');
    expect(result.body.data).to.have.property('price_offered');
    expect(result.body.data).to.have.property('price');
    expect(result.body.data).to.have.property('buyer');
    expect(result.body.data).to.have.property('status');
  });
  it('PATCH /order/ - User update order price fail wrong id', async () => {
    const result = await chai
      .request(app)
      .patch(`${API_PREFIX}/order/234/price`)
      .set('authorization', jwtToken)
      .send({
        price_offered: 1000,
      });
    expect(result).to.have.status(400);
    expect(result.body.status).to.eq(400);
    assert.equal(result.body.message, 'You cant update the price of this order');
  });
});
