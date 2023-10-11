// load dependency name 'fs' gives us the ability to read files from the hd
const fs = require('fs').promises
const path = require('path')
// load dependency named express that implements http
const express = require('express')
const server = express()


// get the function names 'setupServer' from setup.js and configure server settings 
const setupServer = require("./setup")
setupServer(server)

// get helper functions for authentication
const {createUser, login} = require('./auth')

// Route handler for the POST '/createUser' path
server.post('/createUser', async (req, res) => {
    console.log(`Now serving /create to: ${req.socket.remoteAddress}`)
    // use helper function to create user
    const loggedIn = await createUser(req.body.username, req.body.password)
    if(loggedIn.status){
        console.log("user created")
        res.cookie('tehstCookie', `${req.body.username}`);
        res.redirect('/dashboard.html');
    } else {
        console.log("user exists")
        res.redirect('/createUser.html?error=userExists');
    }
})

// Route handler for the POST '/login' path
server.post('/login', async (req, res) => {
    console.log(`Now serving /login to: ${req.socket.remoteAddress}`)
    // use helper function to authenticate user
    const loggedIn = await login(req.body.username, req.body.password)
    if(loggedIn.status){
        res.cookie('tehstCookie', `${req.body.username}`);
        res.redirect('/dashboard.html');
    } else {
        res.redirect('/?error=authFailed');
    }
})

// Route handler for the GET '/login' path
server.get('/logout', (req, res) => {
    // Clear the authentication cookie
    res.clearCookie('tehstCookie');
    // Redirect the user to the login page or another appropriate location
    res.redirect('/');
});

// Catch-all route handler for *.html pages and root path
server.get('/:filename?', (req, res) => {
    const {filename} = req.params
    if(filename && filename.endsWith(".html") || !filename){
    console.log(`Now serving: ${req.socket.remoteAddress} ${filename}`)

    // if user wants anything other than homepage.html make sure they are authenticated
    if(filename && (filename !== 'homepage.html' && filename !== 'createUser.html' )){
        if (!req.cookies.tehstCookie) {
            return res.redirect('/');
        }
    }

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


// start server on port 3000 (default http port)
server.listen(3000, () => {
    console.log("Server listening on Port 3000")
})
