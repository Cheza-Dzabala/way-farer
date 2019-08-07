import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const endpoint = '/api/v1/admins';

const adminAcc = {
  email: 'janeyjanejane@gmail.com',
  password: 'Runfree8',
};


const nonAdminAcc = {
  email: 'cheza@gmail.com',
  password: 'Runfree8',
};

const newAdminAcc = {
  email: 'obiwankenobi@myacc.com',
  password: 'Runfree8',
  first_name: 'Cheza',
  last_name: 'Dzabala',
};

const existingAdmin = {
  email: 'lukeskywalker@gmail.com',
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
  email: 'demoadmin@myacc.com',
  first_name: 'Cheza',
  last_name: 'Dzabala',
};

const missingFirstName = {
  email: 'demoadmin@myacc.com',
  password: 'Runfree8',
  last_name: 'Dzabala',
};

const missingLastName = {
  email: 'demoadmin@myacc.com',
  password: 'Runfree8',
  first_name: 'Cheza',
};


describe('Admin Routes', () => {
  let token = false;
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(adminAcc)
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
        .send(newAdminAcc)
        .set('token', token)
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.be.equal(201, 'Incorrect Status Code Being Returned');
          expect(body).to.have.property('status', 'success', 'Wrong status message in the body is returned');
          expect(body).to.have.property('data');
          expect(body.data.id).to.be.a('number');
          expect(body.data.id).to.not.be.equal(0);
          expect(body.data).to.have.property('email', 'obiwankenobi@myacc.com', 'Email not being returned correctly');
          expect(body.data).to.have.property('first_name', 'Cheza', 'First name not being returned properly');
          expect(body.data).to.have.property('last_name', 'Dzabala', 'Last name not being returned properly');
          done();
        });
    });

    it('Should Reject admin account if Email already exists', (done) => {
      chai.request(app)
        .post(endpoint)
        .send(existingAdmin)
        .set('token', token)
        .end((err, res) => {
          const { body } = res;
          expect(res.status).to.be.equal(409, 'Incorrect Status Code Being Returned');
          expect(body).to.have.property('status', 'Forbidden', 'Wrong status message in the body is returned');
          expect(body.data).to.have.property('message', 'Email already exists on the system');
          done();
        });
    });

    it('Should Reject admin account if Email is not provided', (done) => {
      chai.request(app)
        .post(endpoint)
        .send(missingEmail)
        .set('token', token)
        .end((err, res) => {
          const { body } = res;
          expect(body).to.have.property('status', 'Bad Request', 'Bad Request status not returned');
          expect(res.status).to.be.equal(400, 'Response status is not equal to 404');
          expect(body.data).to.be.have.property('message', '"email" is required');
          done();
        });
    });

    it('Should Reject admin account if Password is not provided', (done) => {
      chai.request(app)
        .post(endpoint)
        .send(missingPassword)
        .set('token', token)
        .end((err, res) => {
          const { body } = res;
          expect(body).to.have.property('status', 'Bad Request', 'Bad Request status not returned');
          expect(res.status).to.be.equal(400, 'Response status is not equal to 404');
          expect(body.data).to.be.have.property('message', '"password" is required');
          done();
        });
    });

    it('Should Reject admin account if first name is not provided', (done) => {
      chai.request(app)
        .post(endpoint)
        .send(missingFirstName)
        .set('token', token)
        .end((err, res) => {
          const { body } = res;
          expect(body).to.have.property('status', 'Bad Request', 'Bad Request status not returned');
          expect(res.status).to.be.equal(400, 'Response status is not equal to 404');
          expect(body.data).to.be.have.property('message', '"first_name" is required');
          done();
        });
    });
    it('Should Reject admin account if last name is not provided', (done) => {
      chai.request(app)
        .post(endpoint)
        .send(missingLastName)
        .set('token', token)
        .end((err, res) => {
          const { body } = res;
          expect(body).to.have.property('status', 'Bad Request', 'Bad Request status not returned');
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
      .post('/api/v1/auth/signin')
      .send(nonAdminAcc)
      .end((err, res) => {
        const { body } = res;
        badToken = `bearer ${body.data.token}`;
        expect(body.data.token);
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
