const express = require('express');
const app = express();
const port = 3000;
const mongoose = require("mongoose");
DATABASE_URL = 'mongodb://localhost/users';
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Customer API",
        description: "Customer API Information",
        contact: {
          name: "Amazing Developer"
        },
        servers: ["http://localhost:5000"]
      }
    },
    // ['.routes/*.js']
    apis: ["routes/*.js"]
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);


mongoose.connect(DATABASE_URL, { useNewUrlParser: true }); 
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connexion to db established"));

app.use(express.json());

const usersRouter = require("./routes/users");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/users", usersRouter);

app.get('/', (req, res) => res.send('Welcome to my API'))


app.listen(port, () => console.log(`Listen to localhost:3000`))