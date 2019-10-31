const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const routerLists = require('./routes/lists');
const routerTasks = require('./routes/tasks')
const routerUsers = require('./routes/users')

mongoose.connect('mongodb://localhost/shareable-todo-new', { useNewUrlParser: true, useUnifiedTopology: true })

// fix a deprecated bugs
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.Promise = global.Promise;

app.use(bodyParser.json())
app.use('/', routerLists)
app.use('/', routerTasks)
app.use('/', routerUsers)

// middleware para admitir errores:
app.use((err,req,res, next) => {
    res.status(422).send({
        error: err.message
    })
})
app.listen(process.env.port || 4000, () => console.log('express listening now...'))
