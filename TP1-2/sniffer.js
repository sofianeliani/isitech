const express = require('express')
const app = express()
var portscanner = require('portscanner');
var tcpPortUsed = require('tcp-port-used');
var sniffer = require('./sniffer.js')

var portCounter = 3000;

// Fonction port aléatoire entre 3000 et 4000
const randomPort = getRandomArbitrary(3000, 4000)
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get('/', (req, res) => res.send('TP 1 ISITECH'))

app.get('/ping', (req, res) =>  {
    tcpPortUsed.check(portCounter, '127.0.0.1')
        .then(function(inUse) {
            while(!inUse && portCounter != randomPort){
                portCounter++;
                console.log('port vérifier : ', portCounter)
            }
            console.log('Le port ' + portCounter + ' est utilisé ');
        }, function(err) {
            console.error('Erreur :', err.message);
    })
    res.status(200).json("pong")
})



app.listen(randomPort, () => console.log(`Example app listening localhost:${randomPort}`))