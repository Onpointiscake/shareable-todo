import mongoose from "mongoose"
import List from "./list"
import Task from "./task"
import User from "./user"

const connectDatabase = () => {
    return mongoose.connect(process.env.DATABASE_URL);
}
const models = { List, Task, User };

export { connectDatabase }
export default models;