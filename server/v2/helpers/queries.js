
const queries = {
  bookings: {
    insertBooking: 'INSERT INTO bookings(trip_id, user_id, seat_number, created_on) VALUES ($1, $2, $3, $4) RETURNING *',
    selectAllBookings: 'SELECT * From bookings',
    selectOneBookings: 'SELECT * From bookings WHERE id = $1',
    selectWhereBookings: 'SELECT * From bookings WHERE user_id = $1',
    deleteFromBookingsWhere: 'DELETE FROM bookings WHERE id = $1',
  },
  users: {
    selectById: 'SELECT * From users WHERE id = $1',
    selectByEmail: 'SELECT * From users WHERE email = $1',
    insertUser: 'INSERT INTO users(first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
  },
  admins: {
    insertAdmin: 'INSERT INTO users(first_name, last_name, email, password, is_admin) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    selectAllAdmins: 'SELECT * From users WHERE is_admin = $1',
  },
  trips: {
    insertTrip: 'INSERT INTO trips(status, origin, destination, fare, seating_capacity, trip_date, bus_license_number) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *',
    selectAllTripsForUsers: 'SELECT * From trips WHERE status != $1',
    selectAllTripsForAdmins: 'SELECT * From trips WHERE status != $1',
    selectOneTrip: 'SELECT * From trips WHERE id = $1',
    selectBusses: 'SELECT * From trips WHERE bus_license_number = $1',
    updateTrip: 'UPDATE trips SET status = $1  WHERE id = $2',
  },

  createTables: {
    bookingsTable: `CREATE TABLE IF NOT EXISTS bookings(
              id SERIAL, trip_id  INTEGER NOT NULL REFERENCES trips(id) ON DELETE CASCADE, user_id  INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, seat_number VARCHAR (128) NOT NULL, created_on VARCHAR (128) NOT NULL, PRIMARY KEY(trip_id, user_id)
            )`,
    tripsTable: `CREATE TABLE IF NOT EXISTS trips(
              id SERIAL PRIMARY KEY, bus_license_number VARCHAR(128) NOT NULL, origin VARCHAR(128) NOT NULL, destination VARCHAR(128) NOT NULL, fare FLOAT(2) NOT NULL, seating_capacity INTEGER NOT NULL, trip_date VARCHAR(128) NOT NULL, status BOOLEAN DEFAULT 'true'
            )`,
    usersTable: `CREATE TABLE IF NOT EXISTS users(
              id SERIAL PRIMARY KEY, first_name VARCHAR(128) NOT NULL, last_name VARCHAR(128) NOT NULL, email VARCHAR(128) NOT NULL, password VARCHAR(128) NOT NULL, is_admin BOOLEAN DEFAULT 'f'
            )`,
  },

  dopTables: {
    allTables: 'DROP TABLE IF EXISTS bookings, trips, users',
  },
};

module.exports = queries;
