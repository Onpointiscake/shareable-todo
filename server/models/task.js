import mongoose from "mongoose";

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
    // a task belongs to a list:
    list: {
        type: mongoose.Schema.Types.ObjectId, ref: 'list'
    }
})

const Task = mongoose.model('task', taskSchema)

export default Task

