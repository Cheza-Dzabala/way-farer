import app from '../app';

const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);

const endpoint = '/api/v1/trips';
const validAcc = {
  email: 'janeyjanejane@gmail.com',
  password: 'Runfree8',
};

const nonAdmin = {
  email: 'cheza@gmail.com',
  password: 'Runfree8',
};


describe('Trip Tests', () => {
  let token = false;
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(validAcc)
      .end((err, res) => {
        const { body } = res;
        token = body.data.token;
        expect(body.data.token);
        done();
      });
  });
  describe('Trip "Post" Routes', () => {
    const validTrip = {
      fare: 55000.10,
      origin: 'Mzuzu',
      destination: 'Blantyre',
      trip_date: '10-10-2019',
      seating_capacity: 20,
      bus_license_number: 'BT 1182',
    };
    it('Should hit an endpoint and make sure it exists', (done) => {
      chai.request(app)
        .post(endpoint)
        .send({ test: 'data' })
        .end((err, res) => {
          expect(res.status).to.not.equal(404, 'route does not exist');
          done();
        });
    });

    it('Should not allow requests that do not have a token attached to the header', (done) => {
      chai.request(app)
        .post(endpoint)
        .send(validTrip)
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.be.equal(401, 'Incorrect status code returned in header');
          expect(body.data).to.have.property('message', 'No token present in the request header', 'Incorrect message returning to user');
          expect(body).to.have.property('status', 'unauthorized', 'Incorrect body status returning to user');
          done();
        });
    });
    it('Should create a trip if data is valid', (done) => {
      chai.request(app)
        .post(endpoint)
        .set('token', `bearer ${token}`)
        .send(validTrip)
        .end((err, res) => {
          const { body } = res;
          expect(res.status).to.be.equal(201);
          expect(body).to.have.property('data');
          expect(body).to.have.property('status', 'success', 'Wrong Status message returned');
          expect(body.data).to.include(validTrip);
          done();
        });
    });
  });


  describe('Trip "Get" Routes', () => {
    it('Should display all trips', (done) => {
      chai.request(app)
        .get(endpoint)
        .set('token', `bearer ${token}`)
        .end((err, res) => {
          const { status, body } = res;
          expect(status).to.be.equal(200, 'Incorrect status being returned');
          expect(body).to.be.a('object');
          done();
        });
    });
  });

  describe('Trip "PATCH" Routes', () => {
    it('Should allow to pacth a trips', (done) => {
      chai.request(app)
        .patch(`${endpoint}/1/cancel`)
        .set('token', `bearer ${token}`)
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.be.equal(200, 'Incorrect Status Code Returning');
          expect(body.status).to.be.equal('success', 'incorrect body status returning');
          expect(body.data.message).to.be.equal('Trip cancelled successfully', 'incorrect body message returning');
          done();
        });
    });

    it('Should not allow to cancel non existent trips', (done) => {
      chai.request(app)
        .patch(`${endpoint}/24/cancel`)
        .set('token', `bearer ${token}`)
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.be.equal(404, 'Returning wrong status');
          expect(body.status).to.be.equal('Resource not found', 'Returning invalid trip status');
          expect(body.data.message).to.be.equal('Trip does not exist', 'Returning invalid message');
          done();
        });
    });
  });
});
