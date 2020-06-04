const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongodb = require("./api/server/con");
//const server = require("./api/server/server");
const admin = require("./api/routes/admin");
require("dotenv").config();

//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
// app.use('/admin', admin)
app.use("/api/v1/admin", admin);

//servidor
const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log("Servidor rodando!" + PORT);
});
