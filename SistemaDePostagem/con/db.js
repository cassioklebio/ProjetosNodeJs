const Sequelize = require('sequelize')
  //Conexao com o bancode dados Mysql
  const sequelize = new Sequelize('mysales', 'cassio', 'hayabusa1300', {
    host: "localhost",
    dialect: 'mysql'
});


module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}