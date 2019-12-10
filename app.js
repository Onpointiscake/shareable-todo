const express = require('express')
const https = require('https')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')

const routerLists = require('./routes/lists');
const routerTasks = require('./routes/tasks')
const routerUsers = require('./routes/users')


mongoose.connect(`mongodb+srv://dbUserTodo:c96iOyR9RWGmQgef@clustertodoheroku-k7ayq.azure.mongodb.net/test?retryWrites=true&w=majority
`,{ useNewUrlParser:true, useUnifiedTopology:true //this line is not mandatory
}).then(()=> console.log('Connected to MongoDB Cloud :)')).catch((err) => console.log(err));

// fix a deprecated bugs
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

// Serve static assets if In Production:
app.use(bodyParser.json())
app.use('/api', routerLists)
app.use('/api', routerTasks)
app.use('/api', routerUsers)

if(process.env.NODE_ENV === 'production'){
    // set static folder:
    app.use(express.static(path.join(__dirname, "front/build")))
    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, 'front', 'build', 'index.html'))
    })
}
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
// middleware para admitir errores:
app.use((err,res) => {
    res.status(422).send({
        error: err.message
    })
})
app.listen(process.env.PORT || 4000, () => console.log('express listening now...'))
