const express = require('express')
const router = express.Router()
const routerAuthor = require('./routerAuthor')
const routerCategory = require('./routerCategory')
const routerBook = require('./routerBook')


//Rota de Categoria
//router.use(routerAuthor);

//Rota de Curso
router.use(routerCategory);

//Rota de Book
//router.use(routerBook);

module.exports = router