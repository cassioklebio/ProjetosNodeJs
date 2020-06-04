const express = require('express')
const routerAuthor = express.Router()
const AuthorController = require('../controllers/authorController')


//Author EndPoints
//Author List all
routerAuthor.get('/author', AuthorController.getAuthor)

//Consult author by id
routerAuthor.get('/author/:id', AuthorController.getAuthorId)

//Save author
routerAuthor.post('/author', AuthorController.postBook)

//Delete author
routerAuthor.delete('/author/:id', AuthorController.deleteAuthor)

//Update author
routerAuthor.put('/author/:id', AuthorController.updateAuthor)


module.exports = routerAuthor