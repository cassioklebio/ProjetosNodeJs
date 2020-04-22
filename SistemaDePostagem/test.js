const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysales', 'cassio', 'hayabusa1300', {
    host: "localhost",
    dialect: 'mysql'
});

sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso")
}).catch(function(erro){
    console.log("Falha ao se conectar:"+erro)

})


const Postagem = sequelize.define('postagens', {
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
})

// Postagem.create({
//     titulo: "Um titulo QualQuer",
//     conteudo: "Isso é um teste...."
// })

const Usuario = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
})

Usuario.create({
    nome: "Cássio Klebio",
    sobrenome: "Pereira Lins",
    idade: 33,
    email: "cassiotr2009@gmail.com"
})

