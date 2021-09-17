const mongoose = require('mongoose') ; 

const subSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:true , 
        minlength:[3,'name must be at least 3 chars']
    },
    chanel:{
        type:String, 
        required:true , 
        minlength:[3,'chanel must be at least 3 chars']
    }
} , {collection:"my-db1",timestamps:true})

module.exports = mongoose.model('' , subSchema) 