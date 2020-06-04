const mongoose = require('mongoose')
require('../models/Author')
const Author = mongoose.model('authors')

//Method for Author save
exports.postBook = (req, res)=>{
    const newAuthor ={
        name: req.body.name,  
        email: req.body.email,
        age: req.body.age,
        formation: req.body.formation,        
        street: req.body.street,
        number: req.body.number,
        phone: req.body.phone,
        city: req.body.city,
        state: req.body.state,
        parents: req.body.parents        
    }
    new Author(newAuthor).save().then(()=>{
        res.statusCode = 201
        res.send({message: 'Author successfully created'})
    }).catch((err)=>{
        if(err){
            throw err
        }
        res.statusCode = 417
        res.send({message: 'Internal error'})
    }) 
}




//Method Listing all Books
exports.getAuthor = (req, res)=>{
    Author.find().lean().then((authors)=>{
        res.json(authors)
    }).catch((err)=>{
        res.statusCode = 417
        res.send({message: 'Internal error'})
    })
}


//Method Listing of books by id
exports.getAuthorId = (req, res)=>{
    Author.findOne({_id: req.params.id}).lean().then((authors)=>{
        res.json(authors)
    }).catch((err)=>{
        if(err){
            res.statusCode = 417
            res.send({message: 'Internal error'})
        }
    })
}

//Method for delete book
exports.deleteAuthor = (req, res) => {
    Author.deleteOne({_id:req.params.id}).lean().then((authors)=>{
        if(authors){
            res.statusCode = 200
            res.send({message: 'Author successfully deleted'})
        }else{
            res.statusCode = 404
            res.send({message: 'Author not found'})
        }
    }).catch((err)=>{
        if(err){
            res.statusCode = 417
            res.send({message: 'Internal error'})
        }
    })
}

exports.updateAuthor = (req, res) =>{
    Author.findByIdAndUpdate(req.params.id,{
        $set:{
            name: req.body.name,  
            email: req.body.email,
            age: req.body.age,
            formation: req.body.formation,        
            street: req.body.street,
            number: req.body.number,
            phone: req.body.phone,
            city: req.body.city,
            state: req.body.state,
            parents: req.body.parents  
        }
    }).then(()=>{
        res.statusCode = 201
        res.send({message: 'Author updated successfully'})

    }).catch((err)=>{
        res.statusCode= 400
        res.send({message: 'Failed to update author: '+err})
    })
}