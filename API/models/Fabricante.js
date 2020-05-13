const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Fabricante = new Schema({

    nomeFantasia: {
        type: String,
        required: TextTrackCue,
    },
    razaoSocial: {
        type: String,
        required: true,
    },
    cnpj: {
        type: Number,
        required: true
    },
    rua: {
        type: String,
        required: true
    },
    numero: {
        type: Number,
        required: true
    },
    telefone: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("fabricante", Fabricante)