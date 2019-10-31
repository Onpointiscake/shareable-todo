var express = require("express");
var routerTasks = express.Router();

routerTasks.get('/tasks/:idLista', (req,res) => {
    res.send('Got a POST request for ALL the tasks of the list ' + req.params.idLista);
})
routerTasks.post('/task/:idLista', (req,res) => {
    res.send('Got a POST request for a task to the list ' + req.params.idLista);
})
routerTasks.delete('/task/:idTask', (req,res) => {
    res.send('Got a DELETE request for a task with id ' + req.params.idTask);
})

module.exports = routerTasks 