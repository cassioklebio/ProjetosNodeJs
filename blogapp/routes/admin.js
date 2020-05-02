const express = require('express')
const router = express.Router()
const routerPostagem = require('./postagem')
const routerCategoria = require('./categoria')
const routerUsuario = require('./usuario')
const {eAdmin} = require("../helpers/eAdmin")



//Rota de Postagem
router.use(routerPostagem)
//Rota de Categoria
router.use(routerCategoria)
//Rota de Usuario
router.use(routerUsuario)


router.get('/',eAdmin, (req, res) =>{
    res.render("admin/index")
    //res.send("Página principal do painel ADM")
})

router.get('/posts', (req, res)=>{
    res.send("Página de posts")
})


module.exports = router