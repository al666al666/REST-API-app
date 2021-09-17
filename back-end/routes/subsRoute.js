const express = require('express') ; 
const route = express.Router() ; 
const subController = require('../controllers/subController')


route.get('/api/getAll' , subController.getAll) 

route.post('/api/postOne', subController.postOne)

//Id

route.get('/api/getOne/:id', subController.getbyId,subController.getOne)

route.delete('/api/deleteOne/:id', subController.getbyId,subController.deleteOne)

route.patch('/api/updateOne/:id',subController.getbyId,subController.updateOne)


module.exports = route; 