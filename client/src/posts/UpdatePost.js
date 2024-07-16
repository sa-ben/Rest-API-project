import React from 'react';
import Modal from '@mui/material/Modal';
import { Box, Button, TextField, Typography } from '@mui/material';

const UpdatePost = ({ isOpen, onClose, editedTitle, editedBody, onTitleChange, onBodyChange, onSaveChanges }) => {

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-body"
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
            }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit Post
                </Typography>
                <TextField
                    label="Title"
                    value={editedTitle}
                    onChange={onTitleChange}
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Body"
                    value={editedBody}
                    onChange={onBodyChange}
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{ mt: 2 }}
                />
                <Button onClick={onSaveChanges}>Save Changes</Button>
                <Button onClick={onClose}>Cancel</Button>
            </Box>
        </Modal>
    );
};

export default UpdatePost;
