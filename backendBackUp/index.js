const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const cors = require('cors')
app = express()

mongoose.connect('mongodb+srv://fut:futfutfut@cluster0-sbqni.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const cup = require("./routes/cup.js")
const partida = require("./routes/partida.js")
app.use(cors())
const player = require("./routes/player.js")

app.use(express.json());
app.use(bodyParser.json())
app.use("/", cup)
app.use("/", partida)
app.use("/", player)


const PORT = 3333

app.listen(PORT, function() {
    console.log("Running app on port " + PORT)
})
