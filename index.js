// load dependency named express that implements our http server
const express = require('express')
const server = express()

// get the function named 'setupServer' from setup.js 
const setupServer = require("./setup")
setupServer(server)

// start server on port 3000
server.listen(3002, () => {
    console.log("Server listening on Port 3002")
})
