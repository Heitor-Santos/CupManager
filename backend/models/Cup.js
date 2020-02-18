const mongoose = require('mongoose')
const CupSchema = new mongoose.Schema({
    nome: String,
    idPartidas: [String]
});
module.exports = mongoose.model('Cup', CupSchema)
