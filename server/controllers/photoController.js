const Photo = require('../models/Photo')

const getAllPhotos = async (req, res) => {
    const photos = await Photo.find().lean();
    res.json(photos)
}

const getPhotoById = async (req, res) => {
    const { id } = req.params
    const photo = await Photo.findById(id).lean()
    if (!photo) return res.status(404).send("no photo found")
    res.json(photo)
}

const createPhoto = async (req, res) => {
    const { title, imageUrl } = req.body
    if (!title || !imageUrl) return res.status(400).send("fields are required")
    const photo = await Photo.create({ title, imageUrl })
    if (!photo) return res.status(404).send("could not create a new photo")
    res.json(photo)
}

const updatePhoto = async (req, res) => {
    const { id } = req.params
    const { title, imageUrl } = req.body
    if (!id || !title || !imageUrl) return res.status(400).send("id and other fields are required")
    const photo = await Photo.findById(id).exec()
    post.title = title
    post.imageUrl = imageUrl
    const newPhoto = await photo.save()
    res.json(newPhoto)
}

const deletePhoto = async (req, res) => {
    const { id } = req.body
    if (!id) return res.status(400).send("Id is required")
    const photo = await Photo.findById(id).exec()
    const deleted = await photo.deleteOne()
    res.send(`photo with id ${id} was deleted`)
}

module.exports = { getAllPhotos, getPhotoById, createPhoto, updatePhoto, deletePhoto }
