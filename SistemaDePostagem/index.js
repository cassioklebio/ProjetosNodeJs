const express = require("express");

const app = express();

const handlebars = require('express-handlebars');
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')


//Config
    //Template Engine
    app.engine("handlebars",handlebars({defaultLayout:'main'}));
    app.set('view engine','handlebars');
    //Body Parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    //Conexao com o bancode dados Mysql
    const sequelize = new Sequelize('mysales', 'cassio', 'hayabusa1300', {
        host: "localhost",
        dialect: 'mysql'
    });

  //Rotas
  app.get('/cad', function(req, res){
      res.render('formulario');
  })

  app.post('/add', function(req, res){
      req.body.titulo,
      req.body.conteudo
  })


app.listen(8081, function(){
    console.log("Servidor rodando na url http://localhost:8081");
});