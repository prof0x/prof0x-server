// load dependency name 'fs' gives us the ability to read files from the hd
const fs = require('fs').promises
// load dependency named express that implements http
const express = require('express')
const server = express()

// get the function names 'setupServer' from setup.js and configure server settings 
const setupServer = require("./setup")
setupServer(server)

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
server.get('/login', (req, res) => {
    fs.readFile('./login.html')
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
server.get('/login', (req, res) => {
    fs.readFile('./login.html')
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
server.listen(80, () => {
    console.log("Server listening on Port 80")
})
