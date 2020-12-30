const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('TP 1 ISITECH'))

app.get('/ping', (req, res) =>  {
    res.status(200).json("pong")
})



app.listen(port, () => console.log(`Example app listening localhost:${port}`))