// 3rd party library express that implements our http server
const express = require('express')
const server = express.Router();

// Define a catch-all route handler for *.html pages and the root path
// This code will get called when users request any page or the "/" path
// :filename defines a dynamic path that can be accessed in req.params.filename
// // PART 4 > STEP 1: Uncomment the following line of code 
//  server.get('/:filename?', (req, res) => {
// // PART 4 > STEP 2: Delete the following line of code 
    server.get('(/*?)/:filename?', (req, res) => {

    // get the filename from the request object

// // Part 4 > Step 3: Uncomment the following line of code 
    // const filename = req.params?.filename

// // Part 4 > Step 4: Delete the following line of code
    const filepath = req.path.replace('/', '');

// // Part 4 > Step 5: Uncomment the following block of code
    // // only serve request to / or filenames ending with .html
    // if (filename && filename.endsWith(".html") || !filename) {

    //     // define which pages the user can see without authenticating
    //     const publicPages = [undefined, 'homepage.html', 'createUser.html']

    //     // if user is requesting a restricted page
    //     if (publicPages.includes(filename) != true) {

    //         // if the user does not have a cookie
    //         if (!req.cookies.tehstCookie) {

    //             // redirect them to the login page
    //             res.redirect('/');
    //         }
    //     }

        // If code execution makes it this far then that means that 
        // the user has a cookie or requested a public page (doesn't need a cookie)

        // 3rd party library named 'fs' gives us the ability to read files from the hd
        const fs = require('fs').promises

        // read the html file and send it in the response
// // Part 4 > Step 6: Uncomment the following line of code
        // fs.readFile(`./pages/${filename || "homepage.html"}`)
// // Part 4 > Step 7: Delete the following line of code
        fs.readFile(`./${filepath || "/pages/homepage.html"}`)
            .then((data) => {

                // add HTTP 200 Status to the response header
                // add Content-Type to the response header
                res.writeHead(200, { 'Content-Type': 'text/html' });

                // write file data to response body
                res.write(data);

                // send the response (ends the response stream)  
                res.end()
            }).catch((error) => {
                // redirect to homepage if link doesn't exist
                console.log("redirecting to homepage")
                res.redirect('/');
            })
    
// // Part 4 > Step 8: Uncomment the following line of code
    // } else { // user requested a system file (possible hacker / crawler / bot)
    //     res.status(404).send("Not Found") // don't give it to them
    // }
})

module.exports = server