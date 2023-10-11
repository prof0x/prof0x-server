// load dependency named express that implements http
const express = require('express')

// load fs filesystem tools to read files from the hd
const path = require('path')

// 3rd party library to read and write cookies
const cookieParser = require('cookie-parser');
const { nextTick } = require('process');

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
    server.use('/img', express.static(path.join(__dirname, 'img')));
    server.use('/styles', express.static(path.join(__dirname, 'styles')));

    // server.use((req, res, next)=>{
    //     console.log(`Now serving ${req.path} to: ${req.socket.remoteAddress}`);
    //     next();
    // })

    // connect the routes defined in 'start-here.js'
    server.use(require('./start-here'))

}

module.exports = setupServer