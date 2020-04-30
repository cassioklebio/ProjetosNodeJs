const express = require('express')
const routerCategoria = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')


//Categoria
routerCategoria.get('/categorias', (req, res)=>{
    Categoria.find().lean().sort({date: 'desc'}).then((categorias)=>{
        res.render("admin/categorias", {categorias: categorias})
        
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao listar as categorias")
        res.redirect("/admin")
    })    
})

routerCategoria.get('/categorias/add', (req, res)=>{
    res.render("admin/addcategorias")
})

routerCategoria.post('/categorias/nova', (req, res)=>{

    var erros = [];
    if(!req.body.categoria || typeof req.body.categoria == undefined || req.body.categoria == null){
        erros.push({texto: "Nome inválido"})
    }
    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: "Slug inválido"})
    }

    if(req.body.categoria.length < 2){
        erros.push({texto: "Nome da Categoria é muito pequeno"})
    }

    if(erros.length > 0){
        res.render("admin/addcategorias", {erros: erros})

    }else{
        const novaCategoria = {
            categoria: req.body.categoria,
            slug: req.body.slug
        }
    
        new Categoria(novaCategoria).save()
            .then(() =>{
                req.flash("success_msg", "Categoria criada com sucesso!")
                res.redirect("/admin/categorias")
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro ao salvar a categoria, tente novamente!")
                res.redirect("/admin")
            })
    }
})

routerCategoria.get('/categorias/edit/:id', (req, res)=>{
    Categoria.findOne({_id:req.params.id}).lean().then((categoria)=>{
        res.render("admin/editcategorias", {categoria: categoria})
    }).catch((err)=>{
        req.flash("error_msg", "Esta categoria não existe")
        res.redirect("/admin/categorias")
    })
    
})

routerCategoria.post("/categorias/edit", (req, res) =>{
    Categoria.findOne({_id:req.body.id}).then((categoria)=>{
               
        categoria.categoria = req.body.categoria
        categoria.slug = req.body.slug
        categoria.save().then(()=>{
            req.flash("success_msg", "Categoria editado com sucesso!")
            res.redirect("/admin/categorias")
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro interno ao salvar a edição da categoria")
            res.redirect("/admin/categorias")
        })
        


    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao editar a categoria")
        res.redirect("/admin/categorias")
    })
})

routerCategoria.get('/categorias/deletar/:id',(req, res) =>{
    Categoria.deleteOne({"_id": req.params.id}).then(() =>{
        req.flash("success_msg", "Categoria deletada com sucesso!")
        res.redirect("/admin/categorias")
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao deletar a categoria")
        res.redirect("/admin/categorias"+err)
    })
})

module.exports = routerCategoria