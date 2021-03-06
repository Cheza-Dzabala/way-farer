import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import users from '../__test_data__/users';

process.env.NODE_ENV = 'test';

const version = '/api/v2/';
const { expect } = chai;
chai.use(chaiHttp);

const endpoint = `${version}admins`;

describe('Admin Routes', () => {
  let token = false;
  before((done) => {
    chai.request(app)
      .post(`${version}auth/signin`)
      .send(users.admin)
      .end((err, res) => {
        const { body } = res;
        token = `bearer ${body.data.token}`;
        expect(body.data.token);
        done();
      });
  });

  describe('Test "Get" Routes for admins', () => {
    it('Should check if endpoint exists', (done) => {
      chai.request(app)
        .get(endpoint)
        .set('token', token)
        .end((err, res) => {
          const { body } = res;
          expect(body.message).to.not.be.equal('Cannot Find Route', 'Route cannot be found');
          done();
        });
    });

    it('Should return all admins', (done) => {
      chai.request(app)
        .get(endpoint)
        .set('token', token)
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.be.equal(200, 'Wrong status being returned');
          expect(body.status).to.be.equal('success', 'Success not being returned');
          expect(body.data).to.be.an('array', 'Array not being returned');
          done();
        });
    });

    it('Should create a new admin successfully', (done) => {
      chai.request(app)
        .post(endpoint)
        .send(users.newAdminAcc)
        .set('token', token)
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.be.equal(201, 'Incorrect Status Code Being Returned');
          expect(body).to.have.property('status', 'success', 'Wrong status message in the body is returned');
          done();
        });
    });

    it('Should Reject admin account if Email already exists', (done) => {
      chai.request(app)
        .post(endpoint)
        .send(users.admin)
        .set('token', token)
        .end((err, res) => {
          const { body } = res;
          expect(res.status).to.be.equal(409, 'Incorrect Status Code Being Returned');
          expect(body).to.have.property('status', 'unsuccessful', 'Wrong status message in the body is returned');
          expect(body.data).to.have.property('message', 'Email already exists on the system');
          done();
        });
    });

    it('Should Reject admin account if Email is not provided', (done) => {
      chai.request(app)
        .post(endpoint)
        .send(users.missingEmail)
        .set('token', token)
        .end((err, res) => {
          const { body } = res;
          expect(body).to.have.property('status', 'unsuccessful', 'Bad Request status not returned');
          expect(res.status).to.be.equal(400, 'Response status is not equal to 404');
          expect(body.data).to.be.have.property('message', '"email" is required');
          done();
        });
    });

    it('Should Reject admin account if Password is not provided', (done) => {
      chai.request(app)
        .post(endpoint)
        .send(users.missingPassword)
        .set('token', token)
        .end((err, res) => {
          const { body } = res;
          expect(body).to.have.property('status', 'unsuccessful', 'Bad Request status not returned');
          expect(res.status).to.be.equal(400, 'Response status is not equal to 404');
          expect(body.data).to.be.have.property('message', '"password" is required');
          done();
        });
    });

    it('Should Reject admin account if first name is not provided', (done) => {
      chai.request(app)
        .post(endpoint)
        .send(users.missingFirstName)
        .set('token', token)
        .end((err, res) => {
          const { body } = res;
          expect(body).to.have.property('status', 'unsuccessful', 'Bad Request status not returned');
          expect(res.status).to.be.equal(400, 'Response status is not equal to 404');
          expect(body.data).to.be.have.property('message', '"first_name" is required');
          done();
        });
    });
    it('Should Reject admin account if last name is not provided', (done) => {
      chai.request(app)
        .post(endpoint)
        .send(users.missingLastName)
        .set('token', token)
        .end((err, res) => {
          const { body } = res;
          expect(body).to.have.property('status', 'unsuccessful', 'Bad Request status not returned');
          expect(res.status).to.be.equal(400, 'Response status is not equal to 404');
          expect(body.data).to.be.have.property('message', '"last_name" is required');
          done();
        });
    });
  });
});

describe('Log In: with non admin', () => {
  let badToken = false;
  beforeEach((done) => {
    chai.request(app)
      .post(`${version}auth/signin`)
      .send(users.nonAdmin)
      .end((err, res) => {
        const { body } = res;
        badToken = `bearer ${body.data.token}`;
        expect(res.status).to.be.equal(200, 'Incorrect Status Code Being Returned');
        expect(body).to.have.property('status', 'success', 'Wrong status message in the body is returned');
        expect(body).to.have.property('data');
        expect(body.data).to.have.property('token');
        expect(body.data.token).to.be.a('string', 'incorrect token returned');
        done();
      });
  });
  it('should reject all non admin requests', (done) => {
    chai.request(app)
      .get(endpoint)
      .set('token', badToken)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.be.equal(403, 'User not being returned with appropriate status codes');
        expect(body).to.have.property('data');
        expect(body.data.message).to.be.equal('Only admins can access this section', 'wrong message being returned to the user');
        expect(body.status).to.be.equal('Unauthorized', 'Wrong body status being presented to the user');
        done();
      });
  });
});
