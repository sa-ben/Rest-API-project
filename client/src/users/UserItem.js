import Axios from "axios";
import { useState } from "react";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import UpdateUser from "./UpdateUser";

const UserItem = ({ user, fetchUsers }) => {
    // username, name, email, address, phone
    const [openModal, setOpenModal] = useState(false)
    const [editedUsername, setEditedUsername] = useState(user.username)
    const [editedName, setEditedName] = useState(user.name)
    const [editedEmail, setEditedEmail] = useState(user.email)
    const [editedAddress, setEditedAddress] = useState(user.address)
    const [editedPhone, setEditedPhone] = useState(user.phone)

    const deleteUser = async () => {
        const { data: responseData } = await Axios.delete("http://localhost:5600/api/users", {
            data: { id: user._id }
        })
        fetchUsers()
        console.log(responseData);
    }

    const handleEditOpen = () => setOpenModal(true)
    const handleEditClose = () => setOpenModal(false)
    const handleUsernameChange = (event) => setEditedUsername(event.target.value);
    const handleNameChange = (event) => setEditedName(event.target.value);
    const handleEmailChange = (event) => setEditedEmail(event.target.value);
    const handleAddressChange = (event) => setEditedAddress(event.target.value);
    const handlePhoneChange = (event) => setEditedPhone(event.target.value);

    const handleSaveChanges = async () => {
        try {
            const { data } = await Axios.put(`http://localhost:5600/api/users/${user._id}`, {
                ...user,
                username: editedUsername,
                name: editedName,
                email: editedEmail,
                address: editedAddress,
                phone: editedPhone
            });
            fetchUsers();
            console.log(data);
            handleEditClose();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return <div className="user_item">
        <p className="p_id"> id: {user._id}</p>
        <h2> {user.name} </h2>
        <h4> {user.username} </h4>
        <p> {user.email} </p>
        <p> {user.address} </p>
        <p> {user.phone} </p>
        <div className="div_buttons">
            <button className="btn_delete" title="delete user" onClick={deleteUser}>
                <MdDelete />
            </button>
            <button className="btn_edit"
                title="edit user"
                onClick={handleEditOpen}>
                <MdOutlineEdit />
            </button>
        </div>
        <UpdateUser
            isOpen={openModal}
            onClose={handleEditClose}
            user={user}
            
            editedUsername={editedUsername}
            editedName={editedName}
            editedEmail={editedEmail}
            editedAddress={editedAddress}
            editedPhone={editedPhone}

            onUsernameChange={handleUsernameChange}
            onNameChange={handleNameChange}
            onEmailChange={handleEmailChange}
            onAddressChange={handleAddressChange}
            onPhoneChange={handlePhoneChange}
            onSaveChanges={handleSaveChanges}
        />
    </div>
}

export default UserItem;