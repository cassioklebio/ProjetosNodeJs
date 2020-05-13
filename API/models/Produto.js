const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Produtos = new Schema ({
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    peso: {
        type: String,
        required: true
    },
    dataDeFabricao: {
        type: String,
        required: true,
    },
    dataDeValidade: {
        type: String,
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "categorias",
        required: true
    },
    fabricante: {
        type: Schema.Types.ObjectId,
        ref: "fabricante",
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    } 


})