import React from 'react';
import Modal from '@mui/material/Modal';
import { Box, Button, TextField, Typography } from '@mui/material';

const UpdateTask = ({ isOpen, onClose, editedTitle, editedDescription, editedComplete, onTitleChange, onDescriptionChange, onCompleteChange, onSaveChanges }) => {

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
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
                    Edit Task
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
                    label="Description"
                    value={editedDescription}
                    onChange={onDescriptionChange}
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{ mt: 2 }}
                />
                <Typography sx={{ mt: 2 }}>Complete Status:</Typography>
                <Button
                    variant={editedComplete ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={onCompleteChange}
                    sx={{ mr: 1, mt: 1 }}
                >
                    {editedComplete ? 'Completed' : 'Awaiting'}
                </Button>
                <Button onClick={onSaveChanges}>Save Changes</Button>
                <Button onClick={onClose}>Cancel</Button>
            </Box>
        </Modal>
    );
};

export default UpdateTask;
