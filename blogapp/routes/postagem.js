const express = require('express')
const routerPostagem = express.Router()
const mongoose = require('mongoose')
require("../models/Postagem")
const Postagem = mongoose.model('postagens')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')
const {eAdmin} = require("../helpers/eAdmin")

//Postagens
routerPostagem.get('/postagens', eAdmin, (req, res)=>{
    Postagem.find().lean().populate("categoria").sort({data:"desc"}).then((postagens)=>{
        res.render("admin/postagens", {postagens: postagens})
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao listar as postagens")
        res.redirect("/admin")
    })
})

routerPostagem.get('/postagens/add', eAdmin,(req, res)=>{
    Categoria.find().lean().then((categorias) =>{
        res.render("admin/addpostagem", {categorias: categorias})
    }).catch((err) =>{
        req.flash("error_msg", "Houve um erro ao carregar o formulário")
        res.render("admin/postagens")
    })
})

routerPostagem.post('/postagens/nova',eAdmin, (req, res)=>{
    
    var erros = []

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        erros.push({texto: "Nome inválido"})
    }
    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: "Slug inválido"})
    }

    if(!req.body.descricao || typeof req.body.descricao == undefined || req.body.descricao == null){
        erros.push({texto: "Descrição inválido"})
    }

    if(req.body.titulo.length < 5){
        erros.push({texto: "Nome da Postagem é muito pequeno"})
    }


    if(req.body.categoria == 0 ){
       erros.push({texto: "Não existe categoria cadastrada, registre uma categoria"})
    }

    if(erros.length > 0){
        res.render("admin/addpostagem", {erros: erros})
    }
    
    else{

        const novaPostagem = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria,
            slug: req.body.slug
        }
        new Postagem(novaPostagem).save().then(()=>{
            req.flash("success_msg", "Postagem criada com sucesso!")
            res.redirect("/admin/postagens")
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro durante o salvamento da postagem")
            res.redirect("/admin/postagens "+err )
        })
    }

})

routerPostagem.get('/postagens/edit/:id',eAdmin, (req, res)=>{
    Postagem.findOne({_id:req.params.id}).lean().then((postagem)=>{
        Categoria.find().lean().then((categorias)=>{
            
            res.render("admin/editpostagens", {categorias: categorias, postagem: postagem, })
        }).catch((err)=>{
            req.flash("error_msg", "flflflflfl")
            res.redirect("/admin/postagens")
        })        
    }).catch((err)=>{
        req.flash("error_msg", "Está Postagem não existe")
        res.redirect("/admin/postagens")
    })
    
})

routerPostagem.post('/postagens/edit',eAdmin, (req, res)=>{

    Postagem.findOne({_id: req.body.id}).then((postagem) =>{
        
        postagem.titulo = req.body.titulo
        postagem.slug = req.body.slug
        postagem.descricao = req.body.descricao
        postagem.conteudo = req.body.conteudo
        postagem.categoria = req.body.categoria

        postagem.save().then(()=>{
            req.flash("success_msg", "Postagem editado com sucesso!")
            res.redirect("/admin/postagens")
        }).catch((err)=>{
            req.flash("error_msg", "Erro interno")
            res.redirect("/admin/postagens")
        })
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao salvar a edição")
        res.redirect("/admin/postagens")
    })
})

routerPostagem.get("/postagens/deletar/:id",eAdmin, (req, res)=>{
    Postagem.deleteOne({_id: req.params.id}).then(()=>{
        res.flash("success_msg", "Postagem deletada com sucesso")
        res.redirect("/admin/postagens")
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro interno")
        res.redirect("/admin/postagens")
    } )
})





module.exports = routerPostagem