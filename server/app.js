const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')

const routerLists = require('./routes/lists');
const routerTasks = require('./routes/tasks')
const routerUsers = require('./routes/users')

mongoose.connect('mongodb://localhost/shareable-todo-new', { useNewUrlParser: true, useUnifiedTopology: true })
// fix a deprecated bugs
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

// Serve static assets if In Production:
if(process.env.NODE_ENV === 'production'){
    // set static folder:
    app.use(express.static(path.join(__dirname, "front/build")))
    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, 'front', 'build', 'index.html'))
    })
}
app.use(bodyParser.json())
app.use('/api', routerLists)
app.use('/api', routerTasks)
app.use('/api', routerUsers)

// middleware para admitir errores:
app.use((err,res) => {
    res.status(422).send({
        error: err.message
    })
})
app.listen(process.env.port || 4000, () => console.log('express listening now...'))
