const mongoose = require('mongoose')
const PartidaSchema = new mongoose.Schema({
    nome: String,
    vencedor: Boolean,
    idPlayersA: [String],
    idPlayersB: [String]
});
module.exports = mongoose.model('Partida', PartidaSchema)
