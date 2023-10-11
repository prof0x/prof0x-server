// load dependency name 'fs' gives us the ability to read files from the hd
const fs = require('fs').promises
const path = require('path')
// load dependency named express that implements http
const express = require('express')
const server = express()

// get the function names 'setupServer' from setup.js and configure server settings 
const setupServer = require("./setup")
setupServer(server)

// Route handler to serve static files from the /img path
server.use('/img', express.static(path.join(__dirname, 'img')));

// Route handler to console.log IP address of every visitor
server.use((req, res) => {
    console.log(`Now serving: ${req.socket.remoteAddress}`)
})

// Route handler for the GET '/' path
server.get('/:filename?', (req, res) => {
    const {filename} = req.params
    if(filename && filename.endsWith(".html") || !filename){
    console.log(`Now serving: ${req.socket.remoteAddress}`)

    // read the html file for the homepage
    fs.readFile(`./${filename || "homepage.html"}`)
    .then((data) => {
        // write HTTP 200 Status and Content-Type to Header
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end()
    })
    } else {
        res.status(404).send("Not Found")
    }
})

const {createUser, login} = require('./auth')

// Route handler for the POST '/login' path
server.post('/login', async (req, res) => {
    console.log(`Now serving /login to: ${req.socket.remoteAddress}`)
    const loginResult = await login(req.body.username, req.body.password)
    console.log({loginResult})
    res.send(`Login Result: ${loginResult}`)
})

// Route handler for the POST '/login' path
server.post('/createUser', async (req, res) => {
    console.log(`Now serving /create to: ${req.socket.remoteAddress}`)
    const loginResult = await createUser(req.body.username, req.body.password)
    console.log({loginResult})
    res.send(`Login Result: ${loginResult}`)
})

// start server on port 3000 (default http port)
server.listen(3000, () => {
    console.log("Server listening on Port 3000")
})
