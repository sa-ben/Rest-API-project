const Post = require('../models/Post')

const getAllPosts = async (req, res) => {
    const posts = await Post.find().lean();
    res.json(posts)
}

const getPostById = async (req, res) => {
    const { id } = req.params
    const post = await Post.findById(id).lean()
    if (!post) return res.status(404).send("no post found")
    res.json(post)
}

const createPost = async (req, res) => {
    const { title, body } = req.body
    if (!title || !body) return res.status(400).send("fields are required")
    const post = await Post.create({ title, body })
    if (!post) return res.status(404).send("could not create a new post")
    res.json(post)
}

const updatePost = async (req, res) => {
    const { id } = req.params
    const { title, body } = req.body
    if (!id || !title || !body) return res.status(400).send("id and other fields are required")
    const post = await Post.findById(id).exec()
    post.title = title
    post.body = body
    const newPost = await post.save()
    res.json(newPost)
}

const deletePost = async (req, res) => {
    const { id } = req.body
    if (!id) return res.status(400).send("Id is required")
    const post = await Post.findById(id).exec()
    const deleted = await post.deleteOne()
    res.send(`post with id ${id} was deleted`)
}

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost }
