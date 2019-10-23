import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: false,
        required: false
    }
})
const User = mongoose.model('user', userSchema)

export default User;