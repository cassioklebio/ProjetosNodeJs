const express = require('express')
const router = express.Router()
const routerPostagem = require('./postagem')
const routerCategoria = require('./categoria')


//Rota de Postagem
router.use(routerPostagem)
//Rota de Categoria
router.use(routerCategoria)


router.get('/', (req, res) =>{
    res.render("admin/index")
    //res.send("Página principal do painel ADM")
})

router.get('/posts', (req, res)=>{
    res.send("Página de posts")
})


module.exports = router