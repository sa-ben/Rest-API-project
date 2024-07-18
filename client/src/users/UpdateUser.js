import React from 'react';
import Modal from '@mui/material/Modal';
import { Box, Button, TextField, Typography } from '@mui/material';

const UpdateUser = ({ isOpen, onClose, editedUsername, editedName, editedPassword, editedEmail, editedAddress, editedPhone
    , onUsernameChange, onNameChange, onEmailChange, onPasswordChange, onAddressChange, onPhoneChange, onSaveChanges }) => {

    const buttonStyles = {
        borderColor: 'rgb(155, 21, 59)',
        color: 'rgb(155, 21, 59)',
        borderRadius: '10px',
        textTransform: 'none'
    };

    const saveButtonStyles = {
        bgcolor: '#4CAF50',
        color: 'white',
        borderRadius: '10px',
        textTransform: 'none',
        '&:hover': {
            bgcolor: 'rgb(155, 21, 59)'
        }
    };

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
                    color={'rgb(155, 21, 59)'}
                    sx={{ fontWeight: '600' }}
                >
                    Edit User Details
                </Typography>
                <TextField
                    label="Username"
                    value={editedUsername}
                    onChange={onUsernameChange}
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Name"
                    value={editedName}
                    onChange={onNameChange}
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Password"
                    value={editedPassword}
                    onChange={onPasswordChange}
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Email"
                    value={editedEmail}
                    onChange={onEmailChange}
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Address"
                    value={editedAddress}
                    onChange={onAddressChange}
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Phone"
                    value={editedPhone}
                    onChange={onPhoneChange}
                    fullWidth
                    variant="outlined"
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

export default UpdateUser;