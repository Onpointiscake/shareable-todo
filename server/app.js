//Config
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express()
app.use(cors())
const port = process.env.PORT;
// Database:
const IndexModels = require('./models/IndexModels');
const { models, connectDatabase } = IndexModels;
// Api routes:
const routerLists = require('./routes/lists');
const routerTasks = require('./routes/tasks')
const routerUsers = require('./routes/users')

connectDatabase().then(async () => {
    
    app.listen(port, () => console.log(`database up and express app running on port ${port}`))
    app.use("/", routerUsers)
    app.use("/", routerLists);
    app.use("/", routerTasks);
})


