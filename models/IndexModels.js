const mongoose = require('mongoose')
const List = require('./list')
const Task = require('./task')
const User = require('./user')

mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

const connectDatabase = () => {
    return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, );
}
const models = { List, Task, User };

module.exports = {
    models, connectDatabase
}