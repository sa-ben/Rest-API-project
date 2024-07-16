import Axios from "axios";
import { useState } from "react";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import UpdatePost from "./UpdatePost";

const PostItem = ({ post, fetchPosts }) => {

    const [openModal, setOpenModal] = useState(false)
    const [editedTitle, setEditedTitle] = useState(post.title)
    const [editedBody, setEditedBody] = useState(post.body)

    const deletePost = async () => {
        const { data: responseData } = await Axios.delete("http://localhost:5600/api/posts", {
            data: { id: post._id }
        })
        fetchPosts()
        // sortPosts(sortBy)
        console.log(responseData);
    }

    const handleEditOpen = () => setOpenModal(true)
    const handleEditClose = () => setOpenModal(false)
    const handleTitleChange = (event) => setEditedTitle(event.target.value);
    const handleBodyChange = (event) => setEditedBody(event.target.value);

    const handleSaveChanges = async () => {
        try {
            const { data } = await Axios.put(`http://localhost:5600/api/posts/${post._id}`, {
                ...post,
                title: editedTitle,
                body: editedBody,
            });
            fetchPosts();
            // sortPosts("alphabeta");
            console.log(data);
            handleEditClose();
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    return <div className="post_item">
        <p className="p_id"> id: {post._id}</p>
        <h2> {post.title} </h2>
        <p> {post.body}</p>
        <div className="div_buttons">
            <button className="btn_delete" title="delete post" onClick={deletePost}>
                <MdDelete />
            </button>
            <button className="btn_edit"
                title="edit post"
                onClick={handleEditOpen}>
                <MdOutlineEdit />
            </button>
        </div>
        <UpdatePost
            isOpen={openModal}
            onClose={handleEditClose}
            post={post}
            editedTitle={editedTitle}
            editedBody={editedBody}
            onTitleChange={handleTitleChange}
            onBodyChange={handleBodyChange}
            onSaveChanges={handleSaveChanges}
        />
    </div>
}

export default PostItem;