const {jwt, Secret, JwtPayload} = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const users = [{username:"JHegler", password:"Poptart"}]

async function createUser(username, password){
    const index = users.indexOf((user) => user.username === username)
    if (index >= 0)
        return "User Exists"
    else 
        {
            users.push({username:username, password: password}) // await bcrypt.hash(password, 10)})
            return "Created user: " + username
        }
}

async function login(username, password) {
    console.log("logging in")
    const index = users.findIndex((user) => user.username === username)
    if (index >= 0){
        if(users[index].password === password) // await bcrypt.hash(password, 10))
            return "User logged in: " + username
        else    
            return "Incorrect password!"
    }
    else 
    {
        return "User does not exist."
    }
}

module.exports = {
    createUser,
    login
}