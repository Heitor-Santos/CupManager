const mongoose = require('mongoose')
const PlayerSchema = new mongoose.Schema({
    nome: String,
    estatsPartidas: [{
        golsFavor: Number,
        assist: Number,
        golsContra: Number,
        golsTomados: Number,
        goleiro: Number
    }]
});
module.exports = mongoose.model('Player', PlayerSchema)
