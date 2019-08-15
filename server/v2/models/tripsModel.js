import dbServices from '../services/tripServices';

class Trips {
  constructor({
    id, status, origin, destination, fare, seating_capacity, trip_date, bus_license_number,
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

async function create(data) {
  const object = await dbServices.create(data);
  const trip = new Trips(object);
  return trip;
}

async function all() {
  const trips = await dbServices.all();
  return trips;
}

async function findTrip(id) {
  const trip = await dbServices.find(id);
  return trip;
}

async function findBus(bus_license_number) {
  const busses = await dbServices.findBusses(bus_license_number);
  return busses;
}

async function cancel(trip) {
  await dbServices.cancel(trip.id);
  return { status: 'success' };
}
module.exports = {
  create, all, findTrip, cancel, findBus,
};
