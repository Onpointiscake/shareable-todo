var express = require('express')
var routerUsers = express.Router();

routerUsers.get('/user/:id', (req,res) => {
    res.send('Got a GET request for the user ' + req.params.id);
})
routerUsers.post('/user', (req,res) => {
    res.send('Got a POST request for an user ');
})
routerUsers.delete('/user/:id', (req,res) => {
    res.send('Got a DELETE request for the user ' + req.params.id);
})

module.exports = routerUsers;