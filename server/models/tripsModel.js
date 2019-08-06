/* eslint-disable camelcase */
import trips from '../data/trips.json';
import helper from '../helpers/helpers';


class Trips {
  constructor({
    id, origin, destination, fare, seating_capacity, trip_date, status, bus_license_number,
  }) {
    this.id = id;
    this.fare = fare;
    this.destination = destination;
    this.seating_capacity = seating_capacity;
    this.origin = origin;
    this.trip_date = trip_date;
    this.status = status;
    this.bus_license_number = bus_license_number;
  }
}

const create = (data) => {
  data.id = helper.generateId(trips);
  data.status = true;
  const trip = new Trips(data);
  trips.push(trip);
  return trip;
};

const all = () => {
  const payload = [];
  trips.forEach((element) => {
    payload.push(element);
  });
  return payload;
};

const findTrip = (id) => {
  const trip = trips.find(t => t.id === parseInt(id));
  return trip;
};

const findBus = (bus_license_number) => {
  const bus = trips.find(t => t.bus_license_number === bus_license_number);
  return bus;
};

const cancel = (trip) => {
  try {
    trip.status = false;
    return { status: 'success', details: null };
  } catch (error) {
    return { status: 'error', details: error.message };
  }
};
module.exports = {
  create, all, findTrip, cancel, findBus,
};
