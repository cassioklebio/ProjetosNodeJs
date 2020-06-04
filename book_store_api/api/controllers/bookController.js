const mongoose = require('mongoose')
require('../models/Book')
const Book = mongoose.model('books')

//Method for Book save
exports.postBook = (req, res)=>{
    const newBook = {
        name: req.body.name,
        slug: req.body.slug,
        description: req.body.description,
        category: req.body.category,
        isbn: req.body.isbn,
        authors: req.body.authors
    }
    new Book(newBook).save().then(()=>{
        res.statusCode = 201
        res.send({message: 'Book successfully created'})
    }).catch((err)=>{
        if(err){
            throw err
        }
        res.statusCode = 417
        res.send({message: 'Internal error'})
    })
}

//Method Listing all Books
exports.getBook = (req, res)=>{
    Book.find().lean().then((books)=>{
        res.json(books)
    }).catch((err)=>{
        res.statusCode = 417
        res.send({message: 'Internal error'})
    })
}

//Method listing of books by id
exports.getBookId = (req, res)=>{
    Book.findOne({_id: req.params.id}).lean().then((books)=>{
        res.json(books)
    }).catch((err)=>{
        if(err){
            res.statusCode = 417
            res.send({message: 'Internal error'})
        }
    })
}

//Method for delete category
exports.deleteBook = (req, res) => {
    Book.deleteOne({_id:req.params.id}).lean().then((books)=>{
        if(books){
            res.statusCode = 200
            res.send({message: 'Books successfully deleted'})
        }else{
            res.statusCode = 404
            res.send({message: 'Book not found'})
        }
    }).catch((err)=>{
        if(err){
            res.statusCode = 417
            res.send({message: 'internal error'})
        }
    })
}

//Method for update Book
exports.updateBook = (req, res)=>{
    Book.findByIdAndUpdate(req.params.id,{
        $set: {
            name: req.body.name,
            slug: req.body.slug,
            description: req.body.description,
            category: req.body.category,
            isbn: req.body.isbn,
            authors: req.body.authors
        }
    }).then(()=>{
        res.statusCode = 201
        res.send({message: 'Book updated successfully'})
    }).catch((err)=>{
        res.statusCode = 400
        res.send({message: 'Failed to update Book: '+err})
    })
}