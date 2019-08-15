const users = {
  nonAdmin: {
    email: 'davinciforsure@gmail.com',
    password: 'Runfree8418',
  },
  admin: {
    email: 'dzabalamacheza@gmail.com',
    password: 'Runfree8418',
  },
  newAdminAcc: {
    email: 'kwaigonjin@myacc.com',
    first_name: 'Kwaigon',
    last_name: 'Jinn',
    password: 'Runfree8',
  },
  missingLastName: {
    email: 'anotheradmin@myacc.com',
    first_name: 'Kwaigon',
    password: 'Runfree8',
  },
  missingFirstName: {
    email: 'anotheradmin@myacc.com',
    last_name: 'Jinn',
    password: 'Runfree8',
  },
  missingPassword: {
    email: 'anotheradmin@myacc.com',
    first_name: 'Kwaigon',
    last_name: 'Jinn',
  },
  missingEmail: {
    first_name: 'Kwaigon',
    last_name: 'Jinn',
    password: 'Runfree8',
  },

  existentEmailAcc: {
    email: 'dzabalamacheza@gmail.com',
    password: 'Runfree8',
    first_name: 'Cheza',
    last_name: 'Dzabala',
  },

  validAcc: {
    email: 'demo@myacc.com',
    password: 'Runfree8',
    first_name: 'Cheza',
    last_name: 'Dzabala',
  },


  /** For admin Tests */

  lastNameSpecialCharacters: {
    email: 'user@myguy.com',
    password: 'Hello22',
    first_name: 'User',
    last_name: 'foo-baz',
  },

  firstNameSpecialCharacters: {
    email: 'user@myguy.com',
    password: 'Hello4',
    first_name: 'MYGUY@',
    last_name: 'foobaz',
  },

  nonAlphaPassword: {
    email: 'user@myguy.com',
    password: 'Hello',
    first_name: 'MYGUY',
    last_name: 'foobaz',
  },
};

module.exports = users;
