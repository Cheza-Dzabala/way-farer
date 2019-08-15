import app from '../../app';
import users from '../__test_data__/users';
import trips from '../__test_data__/trips';

const chai = require('chai');
const chaiHttp = require('chai-http');

process.env.NODE_ENV = 'test';

const { expect } = chai;
chai.use(chaiHttp);
const version = '/api/v2/';

const endpoint = `${version}trips`;

describe('Trip Tests', () => {
  let token = false;
  before((done) => {
    chai.request(app)
      .post(`${version}auth/signin`)
      .send(users.admin)
      .end((err, res) => {
        const { body } = res;
        const collectedToken = body.data.token;
        token = collectedToken;
        expect(body.data.token);
        done();
      });
  });
  describe('Trip "Post" Routes', () => {
    it('- Should hit an endpoint and make sure it exists', (done) => {
      chai.request(app)
        .post(endpoint)
        .send({ test: 'data' })
        .end((err, res) => {
          expect(res.status).to.not.equal(404, 'route does not exist');
          done();
        });
    });

    it('- Should not allow requests that do not have a token attached to the header', (done) => {
      chai.request(app)
        .post(endpoint)
        .send(trips.validTrip)
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.be.equal(401, 'Incorrect status code returned in header');
          expect(body.data).to.have.property('message', 'No token present in the request header', 'Incorrect message returning to user');
          expect(body).to.have.property('status', 'unauthorized', 'Incorrect body status returning to user');
          done();
        });
    });

    it('- Should create a trip if data is valid', (done) => {
      chai.request(app)
        .post(endpoint)
        .set('token', `bearer ${token}`)
        .send(trips.validTrip)
        .end((err, res) => {
          const { body } = res;
          expect(res.status).to.be.equal(201);
          expect(body).to.have.property('data');
          done();
        });
    });


    it('- Should reject double booking a bus', (done) => {
      chai.request(app)
        .post(endpoint)
        .set('token', `bearer ${token}`)
        .send(trips.doubleBookedTrip)
        .end((err, res) => {
          const { body: { data, status } } = res;
          expect(res.status).to.be.equal(209);
          expect(status).to.be.equal('unsuccessful');
          expect(status).to.be.equal('unsuccessful', 'Wrong Status message returned');
          expect(data).to.have.property('message', 'This bus is already booked on a trip on this date', 'Wrong message returned');
          done();
        });
    });


    describe('Empty String tests', () => {
      it('- Should reject empty origin string', (done) => {
        chai.request(app)
          .post(endpoint)
          .set('token', `bearer ${token}`)
          .send(trips.originEmptyString)
          .end((err, res) => {
            const { body: { data }, status } = res;
            expect(status).to.be.equal(400);
            expect(data).to.have.property('message', '"origin" is not allowed to be empty', 'Wrong message bring returned');
            done();
          });
      });

      it('- Should reject empty destination string', (done) => {
        chai.request(app)
          .post(endpoint)
          .set('token', `bearer ${token}`)
          .send(trips.destinationEmptyString)
          .end((err, res) => {
            const { body: { data }, status } = res;
            expect(res.status).to.be.equal(400);
            expect(data).to.have.property('message', '"destination" is not allowed to be empty', 'Wrong message bring returned');
            done();
          });
      });


      it('- Should reject empty date string', (done) => {
        chai.request(app)
          .post(endpoint)
          .set('token', `bearer ${token}`)
          .send(trips.dateEmptyString)
          .end((err, res) => {
            const { body: { data }, status } = res;
            expect(status).to.be.equal(400);
            expect(data).to.have.property('message', '"trip_date" must be a number of milliseconds or valid date string', 'Wrong message bring returned');
            done();
          });
      });
    });

    describe('Negative number tests', () => {
      it('- Should reject fare if its a negative number', (done) => {
        chai.request(app)
          .post(endpoint)
          .set('token', `bearer ${token}`)
          .send(trips.fareNegativeNumber)
          .end((err, res) => {
            const { status } = res;
            expect(status).to.be.equal(400);
            done();
          });
      });
      it('- Should reject seating_capacity if its a negative number', (done) => {
        chai.request(app)
          .post(endpoint)
          .set('token', `bearer ${token}`)
          .send(trips.seatingCapacityNegativeNumber)
          .end((err, res) => {
            const { status } = res;
            expect(status).to.be.equal(400);
            done();
          });
      });
    });


    describe('Testing non admin scenarios', () => {
      let nonAdminToken = false;
      beforeEach((done) => {
        chai.request(app)
          .post(`${version}auth/signin`)
          .send(users.nonAdmin)
          .end((err, res) => {
            const { body } = res;
            nonAdminToken = body.data.token;
            expect(body.data.token);
            done();
          });
      });
      it('- Should not allow non admins to create a trip', (done) => {
        chai.request(app)
          .post(endpoint)
          .set('token', `bearer ${nonAdminToken}`)
          .send(trips.validTripTwo)
          .end((err, res) => {
            const { body } = res;
            const { data } = body;
            expect(res.status).to.be.equal(403);
            expect(body).to.have.property('data');
            expect(data).to.have.property('message', 'Only admins can access this section', 'Wrong message returned');
            expect(body).to.have.property('status', 'Unauthorized', 'Wrong Status message returned');
            done();
          });
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


    it('Should display single trip', (done) => {
      chai.request(app)
        .get(`${endpoint}/1`)
        .end((err, res) => {
          const { status, body } = res;
          expect(status).to.be.equal(200, 'Incorrect status being returned');
          expect(body.data).to.be.a('object');
          done();
        });
    });

    it('Should return trip not found with non existent trip', (done) => {
      chai.request(app)
        .get(`${endpoint}/55`)
        .end((err, res) => {
          const { status, body } = res;
          expect(status).to.be.equal(404, 'Incorrect status being returned');
          expect(body.data.message).to.be.equal('Trip not found', 'Correct message not returned');
          done();
        });
    });

    it('Should return trip not found with invalid character', (done) => {
      chai.request(app)
        .get(`${endpoint}/@`)
        .end((err, res) => {
          const { status, body } = res;
          expect(status).to.be.equal(400, 'Incorrect status being returned');
          expect(body.data.message).to.be.equal('Invalid character set in parameter', 'Correct message not returned');
          done();
        });
    });
  });

  describe('Trip "PATCH" Routes', () => {
    it('Should allow to pacth a trips', (done) => {
      chai.request(app)
        .patch(`${endpoint}/2/cancel`)
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
          expect(status).to.be.equal(400, 'Returning wrong status');
          expect(body.status).to.be.equal('unsuccessful', 'Returning invalid trip status');
          expect(body.data.message).to.be.equal('Trip does not exist', 'Returning invalid message');
          done();
        });
    });
  });
});
