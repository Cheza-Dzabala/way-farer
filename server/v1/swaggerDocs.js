const swaggerJSDoc = require('swagger-jsdoc');

const host = 'https://wayfarer55.herokuapp.com/';
const options = {
  definition: {
    info: {
      title: 'Way Farer', // Title (required)
      version: '1.0',
      description: 'API for the online booking system known as way farer',
      host: 'wayfarer89.herokuapp.com',
      contact: {
        email: 'dzabalamacheza@gmail.com',
      },
    },
    host,
    basePath: 'api/v1',
  },
  // Path to the API docs
  apis: ['./docs/*.doc.js'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
