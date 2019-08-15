const trips = {
  validTrip: {
    fare: '45000',
    origin: 'Mzuzu',
    destination: 'Blantyre',
    trip_date: '10-10-2019',
    seating_capacity: 20,
    bus_license_number: 'BT 1182',
  },

  doubleBookedTrip: {
    fare: '45000',
    origin: 'karonga',
    destination: 'Chintheche',
    trip_date: '10-10-2019',
    seating_capacity: 20,
    bus_license_number: 'BT 1182',
  },


  originEmptyString: {
    fare: '45000',
    origin: ' ',
    destination: 'Blantyre',
    trip_date: '10-10-2019',
    seating_capacity: 20,
    bus_license_number: 'BT 1182',
  },

  destinationEmptyString: {
    fare: '45000',
    origin: 'Mzuzu',
    destination: '   ',
    trip_date: '10-10-2019',
    seating_capacity: 20,
    bus_license_number: 'BT 1182',
  },

  dateEmptyString: {
    fare: '45000',
    origin: 'Mzuzu',
    destination: 'Zomba',
    trip_date: ' ',
    seating_capacity: 20,
    bus_license_number: 'BT 1182',
  },


  fareNegativeNumber: {
    fare: '- 45000',
    origin: 'Mzuzu',
    destination: 'Blantyre',
    trip_date: '10-10-2019',
    seating_capacity: 20,
    bus_license_number: 'BT 1182',
  },

  seatingCapacityNegativeNumber: {
    fare: '45000',
    origin: 'Mzuzu',
    destination: 'Blantyre',
    trip_date: '10-10-2019',
    seating_capacity: -20,
    bus_license_number: 'BT 1182',
  },

  validTripTwo: {
    fare: '45000',
    origin: 'Mzuzu',
    destination: 'Blantyre',
    trip_date: '10-11-2019',
    seating_capacity: 20,
    bus_license_number: 'BT 1182',
  },

};

module.exports = trips;
