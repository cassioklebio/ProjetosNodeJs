const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Author = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    
    formation: {
        type: String,
        require: true

    },  
    
    street: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        require: true
    },
    phone: {
        type: Number,
        require: true,
    },
    city: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    parents: {
        type: String,
        require: true
    },
    
    date: {
        type: Date,
        default: Date.now()
    }
})


mongoose.model("authors", Author)