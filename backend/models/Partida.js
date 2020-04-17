const mongoose = require('mongoose')
const PartidaSchema = new mongoose.Schema({
    nome: String,
    vencedor: Boolean,
    idPlayersA: [String],
    idPlayersB: [String],
    golsA: Number,
    golsB: Number
});
module.exports = mongoose.model('Partida', PartidaSchema)
