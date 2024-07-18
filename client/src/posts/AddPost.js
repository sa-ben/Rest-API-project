import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from '@mui/material';

const AddTask = ({ isOpen, onClose, fetchPosts }) => {

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const navigate = useNavigate()

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const { data } = await Axios.post("http://localhost:5600/api/posts", { title, body })
            setTitle("")
            setBody("")
            navigate("/posts")
            fetchPosts()
            console.log(data)
            onClose()

        } catch (error) {
            console.error("Error submitting the form:", error)
        }
    }

    const buttonStyles = {
        borderColor: 'rgb(155, 21, 59)',
        color: 'rgb(155, 21, 59)',
        borderRadius: '10px',
        textTransform: 'none'
    }

    const saveButtonStyles = {
        bgcolor: '#4CAF50',
        color: 'white',
        borderRadius: '10px',
        textTransform: 'none',
        '&:hover': {
            bgcolor: 'rgb(155, 21, 59)'
        }
    }

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                maxWidth: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: '15px'
            }}>
                <Typography
                    variant="h6"
                    component="h2"
                    align="center"
                    color={"rgb(155, 21, 59)"}
                    sx={{ fontWeight: '600' }}
                >
                    Add New Post
                </Typography>
                <form onSubmit={submitForm}>
                    <TextField
                        label="Title"
                        value={title}
                        placeholder="Title"
                        required
                        fullWidth
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Body"
                        value={body}
                        placeholder="Body"
                        required
                        multiline
                        rows={4}
                        fullWidth
                        onChange={(e) => setBody(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button
                            onClick={onClose}
                            variant="outlined"
                            sx={buttonStyles}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={saveButtonStyles}
                            disabled={title === "" || body === ""}
                        >
                            Save
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}

export default AddTask
