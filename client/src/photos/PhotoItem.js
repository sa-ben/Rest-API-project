import Axios from "axios";
import { useState } from "react";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import UpdatePhoto from "./UpdatePhoto";

const PhotoItem = ({ photo, fetchPhotos }) => {

    const [openModal, setOpenModal] = useState(false)
    const [editedTitle, setEditedTitle] = useState(photo.title)
    const [editedImageUrl, setEditedImageUrl] = useState(photo.imageUrl)

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
                imageUrl: editedImageUrl,
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
        <div className="photo_item_2">
            <h2 style={{ margin: "5px" }}> {photo.title} </h2>
            <img src={photo.imageUrl} alt={photo.title} style={{ width: "350px", height: "250px", marginBottom: "5px" }} />
            <div className="div_buttons">
                <button className="btn_delete" title="delete photo" onClick={deletePhoto}>
                    <MdDelete />
                </button>
                <button className="btn_edit"
                    title="update photo"
                    onClick={handleEditOpen}>
                    <MdOutlineEdit />
                </button>
            </div>
            <p className="p_id_image"> id: {photo._id}</p>
            {/* <p className="p_timestamp"> Created at: {new Date(photo.createdAt).toLocaleString()} </p> */}
        </div>
        <UpdatePhoto
            isOpen={openModal}
            onClose={handleEditClose}
            photo={photo}
            editedTitle={editedTitle}
            editedImageUrl={editedImageUrl}
            onTitleChange={handleTitleChange}
            onImageUrlChange={handleImageUrlChange}
            onSaveChanges={handleSaveChanges}
        />
    </div>
}

export default PhotoItem;