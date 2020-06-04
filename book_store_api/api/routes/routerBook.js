const express = require('express')
const routerBook = express.Router()
const BookController = require('../controllers/bookController')

//Book EndPoints
//Boolk list all
routerBook.get('/book', BookController.getBook)

//Consult book by id
routerBook.get('/book/:id', BookController.getBookId)

//Save Book
routerBook.post('/book', BookController.postBook)

//Delete Book
routerBook.delete('/book/:id', BookController.deleteBook)

//Update Book
routerBook.put('/book/:id', BookController.updateBook)


module.exports = routerBook

