import React from 'react';
import Modal from '@mui/material/Modal';
import { Box, Button, TextField, Typography } from '@mui/material';

const UpdateTask = ({ isOpen, onClose, editedTitle, editedDescription, editedDate,
    editedComplete, onTitleChange, onDescriptionChange, onDateChange, onCompleteChange, onSaveChanges }) => {

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
        '&:hover': { bgcolor: 'rgb(155, 21, 59)' }
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
                <TextField
                    label="DueDate yyyy-mm-dd"
                    value={editedDate}
                    onChange={onDateChange}
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{ mt: 2 }}
                />
                <Typography sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    Complete Status:
                    <Button
                        variant='outlined'
                        size='small'
                        onClick={onCompleteChange}
                        sx={{ ml: 2 }}
                        style={buttonStyles}
                    >
                        {editedComplete ? 'Completed' : 'Awaiting'}
                    </Button>
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        sx={buttonStyles}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onSaveChanges}
                        variant="contained"
                        sx={saveButtonStyles}
                    >
                        Save Changes
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default UpdateTask;
