const mongoose  = require('mongoose')
require('dotenv').config()
const conction = process.env.MONGO_CONNECTION

mongoose.Promise = global.Promise
mongoose.connect(conction, {
    useMongoClient: true,
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Conectado")
}).catch((err)=>{
    console.log("Erro ao se conectar: "+err)
})

module.exports = mongoose



