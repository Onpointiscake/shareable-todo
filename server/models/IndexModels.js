const mongoose = require('mongoose')
const List = require('./list')
const Task = require('./task')
const User = require('./user')

const connectDatabase = () => {
    return mongoose.connect(process.env.DATABASE_URL);
}
const models = { List, Task, User };

module.exports = {
    models, connectDatabase
}