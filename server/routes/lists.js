var express = require("express");
var routerLists = express.Router();


const List = require('../models/list')


routerLists.get('/list/:id', (req, res) => {

    const id = req.params.id;
    List.findById(id)
        .populate()
        .exec()
        .then(list => {
            console.log(list)
            res.status(200).json(list)
        }).catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
})
routerLists.post('/list', (req, res, next) => {

    List.create(req.body).then((list) => {
        res.send(list)
    }).catch(next)
})
routerLists.put('/list/:id', (req, res) => {

    List.findByIdAndUpdate(req.params.id, req.body)
        .then(list => res.send({nueva_informacion: list}))
})
routerLists.delete('/list/:id', (req,res) => {

    List.findByIdAndRemove(req.params.id)
          .then(list => res.send({archivo_eliminado: list}))
})

module.exports = routerLists