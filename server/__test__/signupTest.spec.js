import app from '../app';

const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);

// Test Sign Up Routes
describe('Sign Up Feature', () => {
  const endpoint = '/api/v1/auth/signup';

  const existentEmailAcc = {
    email: 'dzabalamacheza@gmail.com',
    password: 'Runfree8',
    first_name: 'Cheza',
    last_name: 'Dzabala',
  };

  const validAcc = {
    email: 'demo@myacc.com',
    password: 'Runfree8',
    first_name: 'Cheza',
    last_name: 'Dzabala',
  };

  const missingEmail = {
    password: 'Runfree8',
    first_name: 'Cheza',
    last_name: 'Dzabala',
  };


  const missingPassword = {
    email: 'dzabalamacheza@myacc.com',
    first_name: 'Cheza',
    last_name: 'Dzabala',
  };

  const missingFirstName = {
    email: 'dzabalamacheza1@myacc.com',
    password: 'Runfree8',
    last_name: 'Dzabala',
  };

  const missingLastName = {
    email: 'dzabalamacheza2@myacc.com',
    password: 'Runfree8',
    first_name: 'Cheza',
  };

  const lastNameSpecialCharacters = {
    email: 'user@myguy.com',
    password: 'Hello22',
    first_name: 'User',
    last_name: 'foo-baz',
  };

  const firstNameSpecialCharacters = {
    email: 'user@myguy.com',
    password: 'Hello4',
    first_name: 'MYGUY@',
    last_name: 'foobaz',
  };

  const nonAlphaPassword = {
    email: 'user@myguy.com',
    password: 'Hello',
    first_name: 'MYGUY',
    last_name: 'foobaz',
  };


  it('Hit the sign in endpoints', (done) => {
    chai.request(app)
      .post(endpoint)
      .send(existentEmailAcc)
      .end((err, res) => {
        expect(res.status).to.not.equal(404, 'route does not exist');
        done();
      });
  });

  it('Should Successfully Create A New User Account, Provided Valid Data', (done) => {
    chai.request(app)
      .post(endpoint)
      .send(validAcc)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.be.equal(201, 'Incorrect Status Code Being Returned');
        expect(body).to.have.property('status', 'success', 'Wrong status message in the body is returned');
        expect(body).to.have.property('data');
        expect(body.data.id).to.be.a('number');
        expect(body.data.id).to.not.be.equal(0);
        expect(body.data).to.have.property('email', 'demo@myacc.com', 'Email not being returned correctly');
        expect(body.data).to.have.property('first_name', 'Cheza', 'First name not being returned properly');
        expect(body.data).to.have.property('last_name', 'Dzabala', 'Last name not being returned properly');
        expect(body.data).to.have.property('token');
        expect(body.data.token).to.be.a('string', 'incorrect token returned');
        done();
      });
  });


  it('Should Reject A New User account if Email already exists', (done) => {
    chai.request(app)
      .post(endpoint)
      .send(existentEmailAcc)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.be.equal(409, 'Incorrect Status Code Being Returned');
        expect(body).to.have.property('status', 'Forbidden', 'Wrong status message in the body is returned');
        expect(body.data).to.have.property('message', 'Email already exists on the system');
        done();
      });
  });

  it('Should Reject A New User account if Email is not provided', (done) => {
    chai.request(app)
      .post(endpoint)
      .send(missingEmail)
      .end((err, res) => {
        const { body } = res;
        expect(body).to.have.property('status', 'Bad Request', 'Bad Request status not returned');
        expect(res.status).to.be.equal(400, 'Response status is not equal to 404');
        expect(body.data).to.be.have.property('message', '"email" is required');
        done();
      });
  });

  it('Should Reject A New User account if Password is not provided', (done) => {
    chai.request(app)
      .post(endpoint)
      .send(missingPassword)
      .end((err, res) => {
        const { body } = res;
        expect(body).to.have.property('status', 'Bad Request', 'Bad Request status not returned');
        expect(res.status).to.be.equal(400, 'Response status is not equal to 404');
        expect(body.data).to.be.have.property('message', '"password" is required');
        done();
      });
  });

  it('Should Reject A New User account if First Name is not provided', (done) => {
    chai.request(app)
      .post(endpoint)
      .send(missingFirstName)
      .end((err, res) => {
        const { body } = res;
        expect(body).to.have.property('status', 'Bad Request', 'Bad Request status not returned');
        expect(res.status).to.be.equal(400, 'Response status is not equal to 404');
        expect(body.data).to.be.have.property('message', '"first_name" is required');
        done();
      });
  });

  it('Should Reject A New User account if Last Name is not provided', (done) => {
    chai.request(app)
      .post(endpoint)
      .send(missingLastName)
      .end((err, res) => {
        const { body } = res;
        expect(body).to.have.property('status', 'Bad Request', 'Bad Request status not returned');
        expect(res.status).to.be.equal(400, 'Response status is not equal to 404');
        expect(body.data).to.be.have.property('message', '"last_name" is required');
        done();
      });
  });

  it('Should Reject A New User account if First Name has special characters provided', (done) => {
    chai.request(app)
      .post(endpoint)
      .send(firstNameSpecialCharacters)
      .end((err, res) => {
        const { body } = res;
        expect(body).to.have.property('status', 'Bad Request', 'Bad Request status not returned');
        expect(res.status).to.be.equal(400, 'Response status is not equal to 400');
        expect(body.data).to.be.have.property('message');
        done();
      });
  });


  it('Should Reject A New User account if Last Name has special characters provided', (done) => {
    chai.request(app)
      .post(endpoint)
      .send(lastNameSpecialCharacters)
      .end((err, res) => {
        const { body } = res;
        expect(body).to.have.property('status', 'Bad Request', 'Bad Request status not returned');
        expect(res.status).to.be.equal(400, 'Response status is not equal to 400');
        expect(body.data).to.be.have.property('message');
        done();
      });
  });

  it('Should Reject A New User account if password is not alphanumeric', (done) => {
    chai.request(app)
      .post(endpoint)
      .send(nonAlphaPassword)
      .end((err, res) => {
        const { body } = res;
        expect(body).to.have.property('status', 'Bad Request', 'Bad Request status not returned');
        expect(res.status).to.be.equal(400, 'Response status is not equal to 400');
        expect(body.data).to.be.have.property('message');
        done();
      });
  });
});
