var express = require("express");
var routerLists = express.Router();

routerLists.get('/list/:id', (req,res) => {
    res.send('Got a GET request for the list ' + req.params.id);
})
routerLists.post('/list', (req,res) => {
    res.send('Got a POST request for a list ');
})
routerLists.delete('/list/:id', (req,res) => {
    res.send('Got a DELETE request for the list ' + req.params.id);
})

module.exports = routerLists