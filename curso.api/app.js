//Carregando modulos
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongodb = require('./api/config/server')
const mongoose = require('mongoose')
const admin = require('./api/routes/admin')
require ('dotenv').config()
require('./api/models/Curso')
require('./api/models/Categoria')
const Curso = mongoose.model('curso')
const Categoria = mongoose.model('categorias')


//Body Parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    

    app.use('/admin', admin)


//Servidor
    const PORT = process.env.APP_PORT
    app.listen(PORT, ()=>{
        console.log("Servidor rodando!")
    })