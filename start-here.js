// load dependency name 'fs' gives us the ability to read files from the hd
const fs = require('fs').promises

// load dependency named express that implements our http server
const express = require('express')
const server = express.Router();

// get helper functions for authentication
const {createUser, login} = require('./auth')

// Define route handler for the POST '/createUser' path
server.post('/createUser', async (req, res) => {
    
    // helper function returns {status: boolean, message: string}
    const loggedIn = await createUser(req.body.username, req.body.password)
    
    // if a new user was created write their name to a cookie 
    // and redirect to dashboard.html
    if(loggedIn.status){
        res.cookie('tehstCookie', `${req.body.username}`);
        res.redirect('/dashboard.html');
    } else {
        res.redirect('/createUser.html?error=userExists');
    }
})

// Define route handler for the POST '/login' path
server.post('/login', async (req, res) => {

    // use helper function to authenticate user
    const loggedIn = await login(req.body.username, req.body.password)
    if(loggedIn.status){
        res.cookie('tehstCookie', `${req.body.username}`);
        res.redirect('/dashboard.html');
    } else {
        res.redirect('/?error=authFailed');
    }
})

// Define route handler for the GET '/login' path
server.get('/logout', (req, res) => {
    
    // Clear the authentication cookie
    res.clearCookie('tehstCookie');
    
    // Redirect the user to the login page or another appropriate location
    res.redirect('/');

});

// Define a catch-all route handler for *.html pages and root path
server.get('/:filename?', (req, res) => {
    
    // get the filename from the request object
    const filename = req.params.filename

    // only serve request to / or filenames ending with .html
    if(filename && filename.endsWith(".html") || !filename){
        // define which pages the user can see without authenticating
        const publicPages = ['homepage.html','createUser.html']
        // if user is requesting anything other than a public page
        if(publicPages.includes(filename) != true){
            // make sure they are authenticated by checking cookie
            if (!req.cookies.tehstCookie) {
                return res.redirect('/');
            }
        }
        else { // user requested a public page
            // read the html file and send it in the response
            fs.readFile(`./${filename || "homepage.html"}`)
            .then((data) => {
                // write HTTP 200 Status and Content-Type to Header
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end()
            })
        }
    } else { // user requested a system file or a non-exesitent file
        res.status(404).send("Not Found") // don't give it to them
    }
})

module.exports = server