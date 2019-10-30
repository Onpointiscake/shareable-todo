var express = require("express");
var routerLists = express.Router();
const Listrepository = require('../repositories/listRepository')

routerLists.get('/list/:id', (req,res) => {

    const id = req.params.id;

    Listrepository.findById(id).then((list) => {
        res.json(list);
    })
    .catch((error) => console.log(error));
})

routerLists.post('/list', (req,res) => {

    const title = req.body;

    Listrepository.createList(title).then((list) => {

      res.json(list);
    }).catch((error) => console.log(error));
})

routerLists.delete('/list/:id', (req,res) => {
    
    const id = req.params.id;

    Listrepository.deleteById(id).then(() => {

        console.log(`Deleted list with id: ${id}`);
        res.status(200).json({});
    })
    .catch((error) => console.log(error));
})

module.exports = routerLists