const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: false,
        required: [true, 'debes escribir un titulo']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const List = mongoose.model('list', listSchema)

module.exports = List 