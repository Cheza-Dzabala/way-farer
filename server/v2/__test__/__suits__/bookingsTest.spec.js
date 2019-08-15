import app from '../../app';
import users from '../__test_data__/users';
import bookings from '../__test_data__/bookings';

const version = '/api/v2/';
const chai = require('chai');
const chaiHttp = require('chai-http');

process.env.NODE_ENV = 'test';
const { expect } = chai;
chai.use(chaiHttp);

const endpoint = `${version}bookings`;
describe('Booking Tests', () => {
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
  describe('Test "POST" Routes for bookings (Creating Bookings)', () => {
    it('Should create a new booking with valid data', (done) => {
      chai.request(app)
        .post(endpoint)
        .set('token', `bearer ${token}`)
        .send(bookings.validBooking2)
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
    it('Should reject new booking if the seat is already allocated', (done) => {
      chai.request(app)
        .post(endpoint)
        .set('token', `bearer ${token}`)
        .send(bookings.validBooking2)
        .end((err, res) => {
          const { body } = res;
          expect(res.status).to.be.equal(409);
          expect(body).to.have.property('data');
          expect(body).to.have.property('status', 'unsuccessful', 'Wrong data message being passed');
          expect(body.data).to.have.property('message', 'This seat is unavailable', 'Wrong message displayed');
          done();
        });
    });


    it('Should reject request if token is not present in header', (done) => {
      chai.request(app)
        .post(endpoint)
        .send(bookings.validBooking)
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
        .send(bookings.notTripId)
        .end((err, res) => {
          const { body } = res;
          expect(res.status).to.be.equal(400);
          expect(body).to.have.property('status', 'unsuccessful', 'trip Not found status not being returned to the user');
          expect(body.data).to.have.property('message', '"trip_id" is required', 'Booking not being rejected with invalid data');
          done();
        });
    });

    it('Should reject a new boooking with no Seat Number', (done) => {
      chai.request(app)
        .post(endpoint)
        .set('token', `bearer ${token}`)
        .send(bookings.noSeatNumber)
        .end((err, res) => {
          const { body } = res;
          expect(res.status).to.be.equal(400);
          expect(body).to.have.property('status', 'unsuccessful', 'Bad Request status not being returned to the user');
          expect(body.data).to.have.property('message', '"seat_number" is required', 'Booking not being rejected with invalid data');
          done();
        });
    });
  });


  describe('Test "Get" Routes for bookings', () => {
    it('Should return all user bookings', (done) => {
      chai.request(app)
        .get(`${endpoint}`)
        .set('token', `bearer ${token}`)
        .end((err, res) => {
          const { status, body } = res;
          expect(status).to.be.equal(200, 'User not being returned with appropriate status codes');
          expect(body).to.have.property('data');
          expect(body.data).to.be.a('array', 'wrong data type being returned');
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
