const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://fut:futfutfut@cluster0-sbqni.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app = express()
app.use(express.json());
app.use(routes)


app.listen(3333)