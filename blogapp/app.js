//Carregando módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require ('body-parser')
const app = express()
const admin = require('./routes/admin')
const mongodb = require('./con/conection')
const mongoose = require('mongoose')
const path = require('path')
const session = require ('express-session')
const flash = require('connect-flash')
require("./models/Postagem")
require("./models/Categoria")
const Postagem = mongoose.model("postagens")
const Categoria = mongoose.model("categorias")
const passport = require("passport")
require("./config/auth")(passport)

//Configurações 
    //Sessão
    app.use(session({
        secret: "blogapp",
        resave: true,
        saveUninitialized: true
    }))

    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())
    //Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            res.locals.error = req.flash("error")
            res.locals.user = req.user || null;
            next()
    })
    //Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars');  
        
 
      
    //Public 
    app.use(express.static(path.join(__dirname, "public")))

    


//Rotas
    app.get('/', (req, res)=>{
        Postagem.find().lean().populate("categoria").sort({data: "desc"}).then((postagens)=>{
            res.render("index",{postagens: postagens})
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/404")
        })
        
    })
    app.get("/postagem/:slug",(req,res)=>{
        Postagem.findOne({slug: req.params.slug}).lean().then((postagem)=>{
            if(postagem){
                res.render("postagem/index",{postagem: postagem})
            }else{
                req.flash("error_msg", "Esta postagem não existe")
            }
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/")
        })
    })

    app.get("/categorias", (req, res)=>{
        Categoria.find().lean().then((categorias)=>{
            res.render("categorias/index", {categorias: categorias})
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro interno ao listar as categorias")
            res.redirect("/")
        })
    })

    app.get('/categorias/:slug', (req, res)=>{
        Categoria.findOne({slug: req.params.slug}).then((categoria)=>{
              if(categoria){
                
                Postagem.find({categoria: categoria._id}).lean().then((postagens)=>{
                    res.render("categorias/postagens", {postagens: postagens, categoria: categoria})
                }).catch((err)=>{
                    req.flash("error_msg", "Houve um erro ao listar os posts!")
                    res.redirect("/")
                })

              } else{
                  req.flash("error_msg", "Esta categoria não existe")
                  res.redirect("/")
              } 
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro interno ao carregar a página desta categoria")
            res.redirect("/")
        })
    })

    app.get('/404', (req,res)=>{
        res.send("Lista Posts")
    })

    app.get('/',(req, res)=>{
        res.send('Lista Post')
    })

    app.use('/admin', admin)

    
    




//Outras 

const PORT = 8081
app.listen(PORT, ()=>{
    console.log("Servidor rodando! ")
})