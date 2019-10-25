require('dotenv').config()
const express = require('express');
const cors = require('cors');
const IndexModels = require('./models/IndexModels');
const { models, connectDatabase } = IndexModels;
const app = express()
const port = process.env.PORT;


app.use(cors())

connectDatabase().then(async () => {
    app.listen(port, () => console.log(`database up and express app running on port ${port}`))
})


