import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../server/index';

const { assert, expect, use } = chai;

use(chaiHTTP);

const API_PREFIX = '/api/v1';
before(async () => {
  await chai
    .request(app)
    .post(`${API_PREFIX}/auth/signup`)
    .send({
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@gmail.com',
      password: 'adminPwd',
      address: 'ipaja lagos',
    });
  await chai
    .request(app)
    .post(`${API_PREFIX}/auth/signup`)
    .send({
      firstName: 'joel',
      lastName: 'ugwumadu',
      email: 'ugw5@gmail.com',
      password: 'password',
      address: 'ipaja lagos',
    });
});

describe('User Root api', () => {
  it('GET / - User get response when navigate to root', (done) => {
    chai
      .request(app)
      .get('/')
      .end((res) => {
        expect(res).to.eq(null);
        done();
      });
  });
});

describe('User Auth Signup Endpoint Tests', () => {
  it('POST /auth/signup - User SignUp Validation Test(Required)', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signup`)
      .send({
        firstName: '',
        lastName: 'ugwumadu',
        email: 'ugw5@gmail.com',
        password: 'password',
        address: 'ipaja lagos',
      })
      .then((res) => {
        expect(res).to.have.status(400);
        assert.equal(res.body.status, 400);
        assert.equal(res.body.message.firstName, 'First name with minimum of 2 characters long is required');
      });
    done();
  });
  it('POST /auth/signup - User SignUp Validation Test(firstName, lastName)', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signup`)
      .send({
        firstName: '',
        lastName: '',
        email: 'ugw5@gmail.com',
        password: 'password',
        address: 'ipaja lagos',
      })
      .then((res) => {
        expect(res).to.have.status(400);
        assert.equal(res.body.status, 400);
        assert.equal(res.body.message.firstName, 'First name with minimum of 2 characters long is required');
        assert.equal(res.body.message.lastName, 'Last name with minimum of 2 characters long is required');
      });
    done();
  });
  it('POST /auth/signup - User SignUp Validation Test(email)', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signup`)
      .send({
        firstName: 'john',
        lastName: 'doe',
        email: 'ugw5.com',
        password: 'password',
        address: 'ipaja lagos',
      })
      .then((res) => {
        expect(res).to.have.status(400);
        assert.equal(res.body.status, 400);
        assert.equal(res.body.message.email, 'A valid email is required');
      });
    done();
  });
  it('POST /auth/signup - User SignUp Validation Test(already registered)', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signup`)
      .send({
        firstName: 'joel',
        lastName: 'ugwumadu',
        email: 'ugw5@gmail.com',
        password: 'password',
        address: 'ipaja lagos',
      })
      .then((res) => {
        expect(res).to.have.status(409);
        assert.equal(res.body.status, 409);
        assert.equal(res.body.message, 'User already registered please sign in');
      });
    done();
  });
  it('POST /auth/signup - User SignUp successfully', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signup`)
      .send({
        firstName: 'kim',
        lastName: 'shawn',
        email: 'kim@gmail.com',
        password: 'password',
        address: 'ipaja lagos',
      })
      .then((res) => {
        expect(res).to.have.status(201);
        assert.equal(res.body.status, 201);
        assert.equal(res.body.data[0].firstName, 'kim');
        assert.equal(res.body.data[0].lastName, 'shawn');
      });
    done();
  });
});

