import Axios from "axios";
import { useState } from "react";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import UpdatePhoto from "./UpdatePhoto";

const PhotoItem = ({ photo, fetchPhotos }) => {

    const [openModal, setOpenModal] = useState(false)
    const [editedTitle, setEditedTitle] = useState(photo.title)
    const [editedimageUrl, setEditedImageUrl] = useState(photo.body)

    const deletePhoto = async () => {
        const { data: responseData } = await Axios.delete("http://localhost:5600/api/photos", {
            data: { id: photo._id }
        })
        fetchPhotos()
        // sortPhotos(sortBy)
        console.log(responseData);
    }

    const handleEditOpen = () => setOpenModal(true)
    const handleEditClose = () => setOpenModal(false)
    const handleTitleChange = (event) => setEditedTitle(event.target.value);
    const handleImageUrlChange = (event) => setEditedImageUrl(event.target.value);

    const handleSaveChanges = async () => {
        try {
            const { data } = await Axios.put(`http://localhost:5600/api/photos/${photo._id}`, {
                ...photo,
                title: editedTitle,
                imageUrl: editedimageUrl,
            });
            fetchPhotos();
            // sortPhotos("alphabeta");
            console.log(data);
            handleEditClose();
        } catch (error) {
            console.error("Error updating photo:", error);
        }
    };

    return <div className="photo_item">
        <p className="p_id"> id: {photo._id}</p>

        <div className="photo_item_2">
            <h2 style={{marginBottom:"0"}}> {photo.title} </h2>
            <img src={photo.imageUrl} alt={photo.title} style={{ width: "350px", height: "250px", marginBottom:"5px"}} />
            <div className="div_buttons">
                <button className="btn_delete" title="delete photo" onClick={deletePhoto}>
                    <MdDelete />
                </button>
                <button className="btn_edit"
                    title="edit photo"
                    onClick={handleEditOpen}>
                    <MdOutlineEdit />
                </button>
            </div>
        </div>
        <UpdatePhoto
            isOpen={openModal}
            onClose={handleEditClose}
            photo={photo}
            editedTitle={editedTitle}
            editedimageUrl={editedimageUrl}
            onTitleChange={handleTitleChange}
            onImageUrlChange={handleImageUrlChange}
            onSaveChanges={handleSaveChanges}
        />
    </div>
}

export default PhotoItem;