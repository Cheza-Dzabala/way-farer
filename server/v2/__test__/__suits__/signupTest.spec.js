import app from '../../app';
import users from '../__test_data__/users';

const chai = require('chai');
const chaiHttp = require('chai-http');

process.env.NODE_ENV = 'test';
const { expect } = chai;
chai.use(chaiHttp);

const version = '/api/v2/';
// Test Sign Up Routes
describe('Sign Up Feature', () => {
  const endpoint = `${version}auth/signup`;

  it('Hit the sign in endpoints', (done) => {
    chai.request(app)
      .post(endpoint)
      .send(users.existentEmailAcc)
      .end((err, res) => {
        expect(res.status).to.not.equal(404, 'route does not exist');
        done();
      });
  });

  it('Should Successfully Create A New User Account, Provided Valid Data', (done) => {
    chai.request(app)
      .post(endpoint)
      .send(users.validAcc)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.be.equal(201, 'Incorrect Status Code Being Returned');
        done();
      });
  });


  it('Should Reject A New User account if Email already exists', (done) => {
    chai.request(app)
      .post(endpoint)
      .send(users.existentEmailAcc)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.be.equal(409, 'Incorrect Status Code Being Returned');
        done();
      });
  });

  it('Should Reject A New User account if Email is not provided', (done) => {
    chai.request(app)
      .post(endpoint)
      .send(users.missingEmail)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.be.equal(400, 'Response status is not equal to 404');
        done();
      });
  });

  it('Should Reject A New User account if Password is not provided', (done) => {
    chai.request(app)
      .post(endpoint)
      .send(users.missingPassword)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.be.equal(400, 'Response status is not equal to 404');
        done();
      });
  });

  it('Should Reject A New User account if First Name is not provided', (done) => {
    chai.request(app)
      .post(endpoint)
      .send(users.missingFirstName)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.be.equal(400, 'Response status is not equal to 404');
        done();
      });
  });

  it('Should Reject A New User account if Last Name is not provided', (done) => {
    chai.request(app)
      .post(endpoint)
      .send(users.missingLastName)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.be.equal(400, 'Response status is not equal to 404');
        done();
      });
  });

  it('Should Reject A New User account if First Name has special characters provided', (done) => {
    chai.request(app)
      .post(endpoint)
      .send(users.firstNameSpecialCharacters)
      .end((err, res) => {
        expect(res.status).to.be.equal(400, 'Response status is not equal to 400');
        done();
      });
  });


  it('Should Reject A New User account if password is not alphanumeric', (done) => {
    chai.request(app)
      .post(endpoint)
      .send(users.nonAlphaPassword)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.be.equal(400, 'Response status is not equal to 400');
        done();
      });
  });
});
