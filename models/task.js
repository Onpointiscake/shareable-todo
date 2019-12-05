const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: false,
        required: true
    },
    doned: {
        type: Boolean,
        default: false
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'list',
        required: true
    }
})

const Task = mongoose.model('task', taskSchema)

module.exports = Task
