// load fs filesystem tools to read files from the hd
const fs = require('fs').promises
const path = require('path')

// load dependency named express that implements http
const express = require('express')
const server = express()

// load plugin for express that parses request body
const bodyParser = require('body-parser')
server.use(bodyParser.json())

// Route handler to serve static files from the /img path
server.use('/img', express.static(path.join(__dirname, 'img')));

// Route handler for the GET '/' path
server.get('/', (req, res) => {
    console.log(`Now serving: ${req.socket.remoteAddress}`)


    // read the html file for the homepage
    fs.readFile('./homepage.html')
    .then((data) => {
        // write HTTP 200 Status and Content-Type to Header
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end()
    })
})

// Route handler for the POST '/login' path
server.post('/login', (req, res) => {
    console.log(`Now serving: ${req.socket.remoteAddress}`)
    res.send(`Logged in: ${req.body.user}`)
})

// start server on port 80 (default http port)
server.listen(2001, () => {
    console.log("Server listening on Port 2001")
})
