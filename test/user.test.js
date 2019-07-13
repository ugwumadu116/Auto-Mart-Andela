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
      first_name: 'admin',
      last_name: 'admin',
      email: 'admin@gmail.com',
      password: 'adminPwd',
      address: 'ipaja lagos',
    });
  await chai
    .request(app)
    .post(`${API_PREFIX}/auth/signup`)
    .send({
      first_name: 'joel',
      last_name: 'ugwumadu',
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
        first_name: '',
        last_name: 'ugwumadu',
        email: 'ugw5@gmail.com',
        password: 'password',
        address: 'ipaja lagos',
      })
      .then((res) => {
        expect(res).to.have.status(400);
        assert.equal(res.body.status, 400);
        assert.equal(res.body.error.first_name, 'First name with minimum of 2 characters long is required');
      });
    done();
  });
  it('POST /auth/signup - User SignUp Validation Test(firstName, lastName)', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signup`)
      .send({
        first_name: '',
        last_name: '',
        email: 'ugw5@gmail.com',
        password: 'password',
        address: 'ipaja lagos',
      })
      .then((res) => {
        expect(res).to.have.status(400);
        assert.equal(res.body.status, 400);
        assert.equal(res.body.error.first_name, 'First name with minimum of 2 characters long is required');
        assert.equal(res.body.error.last_name, 'Last name with minimum of 2 characters long is required');
      });
    done();
  });
  it('POST /auth/signup - User SignUp Validation Test(email)', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signup`)
      .send({
        first_name: 'john',
        last_name: 'doe',
        email: 'ugw5.com',
        password: 'password',
        address: 'ipaja lagos',
      })
      .then((res) => {
        expect(res).to.have.status(400);
        assert.equal(res.body.status, 400);
        assert.equal(res.body.error.email, 'A valid email is required');
      });
    done();
  });
  it('POST /auth/signup - User SignUp Validation Test(already registered)', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signup`)
      .send({
        first_name: 'joel',
        last_name: 'ugwumadu',
        email: 'ugw5@gmail.com',
        password: 'password',
        address: 'ipaja lagos',
      })
      .then((res) => {
        expect(res).to.have.status(409);
        assert.equal(res.body.status, 409);
        assert.equal(res.body.error, 'User already registered please sign in');
      });
    done();
  });
  it('POST /auth/signup - User SignUp successfully', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signup`)
      .send({
        first_name: 'kim',
        last_name: 'shawn',
        email: 'kim@gmail.com',
        password: 'password',
        address: 'ipaja lagos',
      })
      .then((res) => {
        expect(res).to.have.status(201);
        assert.equal(res.body.status, 201);
        assert.equal(res.body.data.first_name, 'kim');
        assert.equal(res.body.data.last_name, 'shawn');
      });
    done();
  });
});

describe('User Auth SignIn Endpoint Tests', () => {
  it('POST /auth/signin - User SignIn success', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signin`)
      .send({
        email: 'ugw5@gmail.com',
        password: 'password',
      })
      .then((res) => {
        expect(res).to.have.status(200);
        assert.equal(res.body.status, 200);
        assert.equal(res.body.data.email, 'ugw5@gmail.com');
        assert.equal(res.body.data.first_name, 'joel');
        assert.equal(res.body.data.last_name, 'ugwumadu');
      });
    done();
  });
  it('POST /auth/signin - User SignIn Validation Test(not registered user)', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signin`)
      .send({
        email: 'john@gmail.com',
        password: 'password3',
      })
      .then((res) => {
        expect(res).to.have.status(404);
        assert.equal(res.body.status, 404);
        assert.equal(res.body.error, 'User not registered please signup');
      });
    done();
  });
  it('POST /auth/signin - User SignIn Validation Test(wrong password)', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signin`)
      .send({
        email: 'ugw5@gmail.com',
        password: 'password3',
      })
      .then((res) => {
        expect(res).to.have.status(400);
        assert.equal(res.body.status, 400);
        assert.equal(res.body.error, 'invalid password or email');
      });
    done();
  });
  it('GET /wrong - User SignIn Validation Test(wrong password)', (done) => {
    chai
      .request(app)
      .get(`/wrong`)
      .then((res) => {
        expect(res).to.have.status(404);
        assert.equal(res.body.status, 404);
        assert.equal(res.body.error, 'Route does not exist');
      });
    done();
  });
});
