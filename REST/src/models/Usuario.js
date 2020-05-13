const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Usuario = new Schema({
    name:{
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true,
        select:false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const User = mongoose.model('Usuario', Usuario)

module.exports = User