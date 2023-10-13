// 3rd party library that implements http
const express = require('express')

// 3rd party library to interact with filesystem
const path = require('path')

// 3rd party library to read and write cookies
const cookieParser = require('cookie-parser');

// define the function named 'setupServer' used in index.js
function setupServer(server) {

    // add middleware to use cookies
    server.use(cookieParser());

    // add middleware to parse urlencoded form data
    server.use(express.urlencoded({ extended: true }));

    // load plugin for express that parses request body
    const bodyParser = require('body-parser')
    server.use(bodyParser.json())

    // Route handler to serve static files from folders
    server.use('/images', express.static(path.join(__dirname, '../images')));
    server.use('/styles', express.static(path.join(__dirname, '../styles')));

    server.use((req, res, next) => {
        console.log(`Now serving ${req.method} ${req.path} to ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`);
        next();
    })

    // connect the routes defined in 'start-here.js'
    server.use(require('../routes/pages'))
    server.use(require('../routes/createUser'))
    server.use(require('../routes/login'))
    server.use(require('../routes/logout'))

    process.on('exit', () => console.log("Server was forced to exit."))
}

module.exports = setupServer