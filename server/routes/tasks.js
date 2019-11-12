var express = require("express");
var routerTasks = express.Router();

const Task = require('../models/task')
const List = require('../models/list')

// Get tasks by list:
routerTasks.get('/tasks/:idList', (req, res) => {

    Task.find({
        'list':req.params.idList
    }).exec()
        .then(list => res.status(200).json(list) )
        .catch(err => res.status(500).json({ error: err }) )
})
// Get a single task
routerTasks.get('/task/:idTask', (req, res) => {

    Task.findById(req.params.idTask).exec()
        .then(task => res.status(200).json(task))
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
})
routerTasks.post('/task', (req, res, next) => {

    List.findById(req.body.list).then(() => {

        Task.create(req.body)
            .then(task => res.send(task))
            .catch(next)

    }).catch(err => {
        res.status(500).json({ message: 'error al atribuir esta tarea a una lista' })
    })

})
routerTasks.put('/task/:idTask', (req, res) => {

    Task.findByIdAndUpdate(req.params.idTask, req.body)
        .then(task => res.send({ se_cambio: task }))
        .catch()
})
routerTasks.delete('/task/:idTask', (req, res) => {

    Task.findByIdAndRemove(req.params.idTask)
        .then(task => res.send({ archivo_eliminado: task }))
})
// delete tasks of a list
routerTasks.delete('/tasks/:idList', (req, res) => {

    Task.deleteMany({
        'list':req.params.idList
    }).exec()
        .then(tasks => res.status(200).send({ tasks_eliminadas: tasks}) )
        .catch(err => res.status(500).json({ error: err }) )
})

module.exports = routerTasks 