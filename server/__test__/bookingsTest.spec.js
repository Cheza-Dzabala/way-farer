import app from '../app';

const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);


const validBooking = {
  trip_id: 1,
  user_id: 1,
  seat_number: '3a',
};

const notTripId = {
  user_id: 1,
  seat_number: '3a',
};


const noUserId = {
  trip_id: 1,
  seat_number: '3a',
};

const noSeatNumber = {
  trip_id: 1,
  user_id: 1,
};
const endpoint = '/api/v1/bookings';

const validAcc = {
  email: 'janeyjanejane@gmail.com',
  password: 'Runfree8418_!*',
};


const nonAdmin = {
  email: 'cheza@gmail.com',
  password: 'Runfree8418_!*',
};

describe('Booking Tests', () => {
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
  describe('Test "Get" Routes for bookings', () => {
    it('Should check if enpoint exists', (done) => {
      chai.request(app)
        .get(endpoint)
        .set('token', token)
        .end((err, res) => {
          const { body, status } = res;
          expect(body.message).to.not.be.equal('Cannot Find Route', 'Route cannot be found');
          done();
        });
    });

    it('Should return all user bookings', (done) => {
      chai.request(app)
        .get(`${endpoint}/1`)
        .set('token', `bearer ${token}`)
        .end((err, res) => {
          const { status, body } = res;
          expect(status).to.be.equal(200, 'User not being returned with appropriate status codes');
          expect(body).to.have.property('data');
          expect(body.data).to.be.a('array', 'wrong data type being returned');
          done();
        });
    });


    it('Should return all bookings if user is admin', (done) => {
      chai.request(app)
        .get(`${endpoint}`)
        .set('token', `bearer ${token}`)
        .set('id', 3)
        .end((err, res) => {
          const { status, body } = res;
          expect(status).to.be.equal(200, 'Admin not being returned with appropriate status codes');
          expect(body).to.have.property('data');
          expect(body.data).to.be.a('array', 'wrong data type being returned');
          done();
        });
    });

    describe('Login with non admin acc', () => {
      let nonAdminToken = false;
      beforeEach((done) => {
        chai.request(app)
          .post('/api/v1/auth/signin')
          .send(nonAdmin)
          .end((err, res) => {
            const { body } = res;
            nonAdminToken = body.data.token;
            expect(body.data.token);
            done();
          });
      });

      it('Should refuse to return all bookings if user is not admin', (done) => {
        chai.request(app)
          .get(`${endpoint}`)
          .set('token', `bearer ${nonAdminToken}`)
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
  });

  describe('Test "POST" Routes for bookings (Creating Bookings)', () => {
    it('Should create a new boooking with valid data', (done) => {
      chai.request(app)
        .post(endpoint)
        .set('token', `bearer ${token}`)
        .send(validBooking)
        .end((err, res) => {
          const { body } = res;
          expect(res.status).to.be.equal(201);
          expect(body).to.have.property('data');
          expect(body).to.have.property('status', 'success', 'Wrong Status message returned');
          expect(body.data).to.have.a.property('booking_id');
          expect(body.data).to.have.a.property('bus_license_number');
          expect(body.data).to.have.a.property('trip_date');
          expect(body.data).to.have.a.property('first_name');
          expect(body.data).to.have.a.property('last_name');
          expect(body.data).to.have.a.property('user_email');
          done();
        });
    });

    it('Should reject request if token is not present in header', (done) => {
      chai.request(app)
        .post(endpoint)
        .send(validBooking)
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.be.equal(401, 'Wrong Status being returned');
          expect(body.data).to.have.property('message', 'No token present in the request header', 'Incorrect message returning to user');
          expect(body).to.have.property('status', 'unauthorized', 'Incorrect body status returning to user');
          done();
        });
    });


    it('Should reject a new booking with no Trip Id', (done) => {
      chai.request(app)
        .post(endpoint)
        .set('token', `bearer ${token}`)
        .send(notTripId)
        .end((err, res) => {
          const { body } = res;
          expect(res.status).to.be.equal(404);
          expect(body).to.have.property('status', 'Trip not found', 'trip Not found status not being returned to the user');
          expect(body.data).to.have.property('message', 'No trip found with this ID', 'Booking not being rejected with invalid data');
          done();
        });
    });


    it('Should reject a new boooking with no user Id', (done) => {
      chai.request(app)
        .post(endpoint)
        .set('token', `bearer ${token}`)
        .send(noUserId)
        .end((err, res) => {
          const { body } = res;
          expect(res.status).to.be.equal(404);
          expect(body).to.have.property('status', 'User not found', 'User Not found status not being returned to the user');
          expect(body.data).to.have.property('message', 'No user found with this ID', 'Booking not being rejected with invalid data');
          done();
        });
    });

    it('Should reject a new boooking with no Seat Number', (done) => {
      chai.request(app)
        .post(endpoint)
        .set('token', `bearer ${token}`)
        .send(noSeatNumber)
        .end((err, res) => {
          const { body } = res;
          expect(res.status).to.be.equal(400);
          expect(body).to.have.property('status', 'Bad Request', 'Bad Request status not being returned to the user');
          expect(body.data).to.have.property('message', '"seat_number" is required', 'Booking not being rejected with invalid data');
          done();
        });
    });
  });

  describe(' Test "DELETE" routes for bookings', () => {
    it('Should successfully delete a booking', (done) => {
      chai.request(app)
        .delete(`${endpoint}/1`)
        .set('token', `bearer ${token}`)
        .end((err, res) => {
          const { body } = res;
          expect(res.status).to.be.equal(200, 'Incorrect Status being returned');
          expect(body.status).to.be.equal('success', 'Incorrect body status being returned');
          expect(body.data.message).to.be.equal('Successfully deleted booking', 'Incorrect booking being returned');
          done();
        });
    });

    it('Should not delete a booking if no token is present', (done) => {
      chai.request(app)
        .delete(`${endpoint}/1`)
        .end((err, res) => {
          const { body } = res;
          expect(res.status).to.be.equal(401, 'Incorrect Status being returned');
          expect(body.status).to.be.equal('unauthorized', 'Incorrect body status being returned');
          expect(body.data.message).to.be.equal('No token present in the request header', 'Incorrect failure message being returned');
          done();
        });
    });
  });
});
