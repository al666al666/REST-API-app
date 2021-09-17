const express = require('express');
const mongoose = require('mongoose');
const subRoute = require('./routes/subsRoute')
const bodyParser = require('body-parser')
const path = require('path')
const app = express();

const connectDB = async () => {
    try {
        const connect = await mongoose.connect('mongodb://localhost:27017', {
            useUnifiedTopology: true, useNewUrlParser: true
        })
        console.log('db connected');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}
connectDB()
app.use('/', express.static(path.resolve(__dirname, '../front-end')))
app.use(bodyParser.json())
app.use('/', subRoute)

app.listen(3000, () => console.log('server connected'))


