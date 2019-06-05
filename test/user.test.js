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
      firstName: 'joel',
      lastName: 'ugwumadu',
      email: 'ugw5@gmail.com',
      password: 'password',
      address: 'ipaja lagos',
    });
  await chai
    .request(app)
    .post(`${API_PREFIX}/auth/signup`)
    .send({
      firstName: 'test',
      lastName: 'test',
      email: 'test@gmail.com',
      phone: '07064586146',
      password: '1234password',
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
        assert.equal(res.body.message, 'User with that email is already registered');
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
      });
    done();
  });
});

describe('User Auth SignIn Endpoint Tests', () => {
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
        assert.equal(res.body.message, 'User not registered please signup');
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
        assert.equal(res.body.message, 'invalid password or email');
      });
    done();
  });
});

// describe('Car Endpoint Tests', () => {
//   it('POST /car/ - User POST car', (done) => {
//     chai
//       .request(app)
//       .post(`${API_PREFIX}/car`)
//       .set('authorization', jwtToken)
//       .set('Content-Type', 'application/x-www-form-urlencoded')
//       .field('manufacturer', 'General Motors (GM)')
//       .field('name', 'Chevrolet')
//       .field('model', '2018 model')
//       .field('price', 232)
//       .field('bodyType', 'car')
//       .field('state', 'new')
//       .attach('image',
//         fs.readFileSync('UI/images/car1.jpg'),
//         'car1.jpg')
//       .then((res) => {
//         expect(res).to.have.status(201);
//         expect(res.body.status).to.eq(201);
//         expect(res.body.data).to.have.property('id');
//         expect(res.body.data).to.have.property('model');
//         expect(res.body.data).to.have.property('bodyType');
//       });
//     done();
//   });
// });
