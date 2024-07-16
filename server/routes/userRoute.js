const express = require("express")
const router = express.Router()
const userController = require('../controllers/userController')

//creacte a user
router.post('/', userController.createUser)
//get all users
router.get('/', userController.getAllUsers)
//get user by id
router.get('/:id', userController.getUserById)
//update a user
router.put('/:id', userController.updateUser)
//delete a user
router.delete('/',userController.deleteUser)

module.exports = router