// 3rd party library express that implements our http server
const express = require('express')
const server = express.Router();

// Define route handler for the POST '/login' path
server.post('/login', async (req, res) => {

    // get helper function for authentication
    const {login} = require('../helpers/auth')

module.exports = server
    // use helper function to authenticate user
    const loggedIn = await login(req.body.username, req.body.password)
    
    // if user logged in successfully
    if(loggedIn.status){
        
        // give them a cookie
        res.cookie('tehstCookie', `${req.body.username}`);
        
        // and redirect to dashboard
        return res.redirect('./pages/dashboard.html');

    } else { // user did not log in successfully
        res.redirect(`/?error=${loggedIn.message}`); // redirect back to homepage with error message
    }
})

module.exports = server