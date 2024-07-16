const express = require("express")
const router = express.Router()
const postController = require('../controllers/postController')

//creacte a post
router.post('/', postController.createPost)
//get all posts
router.get('/', postController.getAllPosts)
//get post by id
router.get('/:id', postController.getPostById)
//update a post
router.put('/:id', postController.updatePost)
//delete a post
router.delete('/', postController.deletePost)

module.exports = router