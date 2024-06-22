const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

//Metadata info about API
const options = {
    definition: {
        openapi: "3.1.0",
        info: {title: "Explit API", 
            version: "1.00", 
            description: "This is API in node Express for Explit WebApplication",
            contact: {
                name: "Explit App",
                url: "https://explit.com",
                email: "explitapp@gmail.com",
              },
    },
    servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./routes/api/*.js"],
};

//Docs en JSON format
const swaggerSpec = swaggerJSDoc(options);

//Function to setup our docs
const swaggerDocs = (app, port) => {
    app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    console.log(`Version 1.0.0 Docs are availabe at http://localhost:${port}/api/docs`);
};



module.exports = {swaggerDocs};