var mongoose = require("mongoose");
require("dotenv").config();

const conexao = process.env.MONGO_CONNECTION;

global.db = mongoose.connect(conexao, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.on("connected", function () {
  console.log("=====Conexão estabelecida com sucesso=====");
});
mongoose.connection.on("error", function (err) {
  console.log("=====Ocorreu um erro: " + err);
});
mongoose.connection.on("disconnected", function () {
  console.log("=====Conexão finalizada=====");
});
