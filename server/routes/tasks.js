var express = require("express");
var routerTasks = express.Router();

const Task = require('../models/task')

routerTasks.get('/task/:idTask', (req,res) => {
    
    Task.findById(req.params.idTask).exec()
        .then(task => res.status(200).json(task))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
})
routerTasks.post('/task', (req,res, next) => {
    
    Task.create(req.body)
        .then(task => res.send(task))
        .catch(next)
})
routerTasks.put('/task/:idTask', (req, res) => {

    Task.findByIdAndUpdate(req.params.idTask, req.body)
        .then(task => res.send({nueva_informacion: task}))
        .catch()
})
routerTasks.delete('/task/:idTask', (req,res) => {

    Task.findByIdAndRemove(req.params.idTask)
        .then(task => res.send({archivo_eliminado: task}))
})

module.exports = routerTasks 