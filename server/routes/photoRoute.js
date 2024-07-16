const express = require("express")
const router = express.Router()
const photoController = require('../controllers/photoController')

//creacte a photo
router.post('/', photoController.createPhoto)
//get all photos
router.get('/', photoController.getAllPhotos)
//get photo by id
router.get('/:id', photoController.getPhotoById)
//update a photo
router.put('/:id', photoController.updatePhoto)
//delete a photo
router.delete('/', photoController.deletePhoto)

module.exports = router