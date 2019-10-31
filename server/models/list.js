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
// Eliminar todas las tasks que pertenecen a la lista que haya sido eliminada:
/*
listSchema.pre('remove', function(next) {
    this.model('task').deleteMany({ name: this._id }, next)
})
*/


const List = mongoose.model('list', listSchema)

module.exports = List 