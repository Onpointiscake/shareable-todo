const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: false,
        required: false
    }
})
const User = mongoose.model('user', userSchema)

module.exports = User