const express = require('express');
const app = express();
const port = 8080;

// Import Mongo et la connexion à la Database
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'userAPI';
let db


// Connexion à Mongo 
MongoClient.connect(url, function(err, client) {
  console.log("Connexion success DB...");
  db = client.db(dbName);
});

// Middleware
app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/users', async (req, res) => {
    try {
        const userList = await db.collection('users').find({}).toArray()
        res.status(200).json(userList)
    } catch (err) {
        console.log(err)
        throw err
    }
})

app.get('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const user = await db.collection('users').find({id}).toArray()
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
        throw err
    }
})

app.post('/users', async (req, res) => {
    try {
        const user = req.body;
        const userSaved = await db.collection('users').insertOne(user)
        res.status(201).json(userSaved)
    } catch (err) {
        console.log(err)
        throw err
    }
})

app.put('/users/:id', async (req,res) => {
    try {
        const id = parseInt(req.params.id)
        const replaceUser = req.body
        const user = await db.collection('users').replaceOne({id},replaceUser)
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
        throw err
    }
})

app.delete('/users/:id', async (req,res) => {
    try {
        const id = parseInt(req.params.id)
        const user = await db.collection('users').deleteOne({id})
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
        throw err
    } 
})


app.listen(port, () => console.log(`Listen to localhost:8080`))