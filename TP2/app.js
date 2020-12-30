const express = require('express');
const app = express();
const port = 3000;
const mongoose = require("mongoose");
DATABASE_URL = 'mongodb://localhost/users';



mongoose.connect(DATABASE_URL, { useNewUrlParser: true }); 
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connexion to db established"));

app.use(express.json());

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.get('/', (req, res) => res.send('Welcome to my API'))


app.listen(port, () => console.log(`Listen to localhost:3000`))