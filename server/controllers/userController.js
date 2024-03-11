const User = require('../models/User')

//get all users
const getAllUsers = async (req, res) => {
    const users = await User.find().lean();
    res.json(users)
}

//get specific user
const getUserById = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id).lean()
    if (!user) return res.status(404).send("no user found")
    res.json(user)
}

//creacte a user
const createUser = async (req, res) => {
    const { username, name, email, address, phone } = req.body
    if (!username || !name) return res.status(400).send("username and name are required")
    const user = await User.create({ username, name, email, address, phone })
    if (!user) return res.status(404).send("could not create a new user")
    res.json(user)
}

//update a user
const updateUser = async (req, res) => {
    const { id, username, name, email, address, phone } = req.body
    if (!id || !username || !name) return res.status(400).send("some required field/s are missing")
    //find the wanted user
    const user = await User.findById(id).exec()
    //updating
    user.username = username
    user.name = name
    user.email = email
    user.address = address
    user.phone = phone
    const newUser = await user.save()
    res.json(newUser)
}

//delete a user
const deleteUser = async (req, res) => {
    const { id } = req.body
    if (!id) return res.status(400).send("Id is required")
    const user = await User.findById(id).exec()
    const deleted = await user.deleteOne()
    res.send(`user with id ${id} was deleted`)
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser }
