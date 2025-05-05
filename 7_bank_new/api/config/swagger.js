// config/swagger.js

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// const options = {
//   swaggerDefinition: {
//     openapi: '3.0.0', // Sử dụng OpenAPI 3.0
//     info: {
//       title: 'Node.js API with Swagger',
//       version: '1.0.0',
//       description: 'API documentation for Node.js application using Swagger and Docker',
//     },
//     servers: [
//       {
//         url: 'http://localhost:5000', // URL của API
//       },
//     ],
//   },
//   apis: ['./routes/*.js'], // Đường dẫn tới các file route nơi có comment Swagger
// };
const options = {
    definition: { // <-- đổi ở đây
      openapi: '3.0.0',
      info: {
        title: 'Node.js API with Swagger',
        version: '1.0.0',
        description: 'API documentation for Node.js application using Swagger and Docker',
      },
      servers: [
        {
          url: 'http://localhost:5000/api',
        },
      ],
    },
    apis: ['./routes/*.js'],
  };
  

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec, swaggerUi };