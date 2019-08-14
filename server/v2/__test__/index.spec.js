/* eslint-disable no-undef */
import createDB from './__database_hooks__/createDB';
import destroyDB from './__database_hooks__/destroyDB';
import loginTests from './__suits__/signinTest.spec';
import signupTest from './__suits__/signupTest.spec';
import tripTests from './__suits__/tripTests.spec';
import bookingsTest from './__suits__/bookingsTest.spec';
import adminTest from './__suits__/adminTests.spec';


process.env.NODE_ENV = 'test';

before(async () => {
  console.log('Creating Tables');
  await createDB();
});
after(async () => {
  console.log('Dropping Tables');
  await destroyDB();
});
describe('Index Test Runner', () => {
  describe('Sign In Tests', loginTests);
  describe('Sign Up Tests', signupTest);
  describe('Trip Tests', tripTests);
  describe('Booking Tests', bookingsTest);
  describe('Admin Tests', adminTest);
});
