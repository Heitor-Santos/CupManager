const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")

app = express()

mongoose.connect('mongodb+srv://fut:futfutfut@cluster0-sbqni.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const cup = require("./routes/cup.js")
//const perRoutes = require("./routes/pessoa.js")

app.use(express.json());
app.use(bodyParser.json())
app.use("/", cup)
//app.use("/", perRoutes)


const PORT = 3333

app.listen(PORT, function() {
    console.log("Running app on port " + PORT)
})