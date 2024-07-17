import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

const AddUser = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const userData = { username, name, email, address, phone };
            const { data } = await Axios.post("http://localhost:5600/api/users", userData);
            setUsername("");
            setName("");
            setEmail("");
            setAddress("");
            setPhone("");
            navigate("/users");
            console.log(data);
        } catch (error) {
            console.error("Error submitting the form:", error);
        }
    };

    return (
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
            <Typography variant="h6" component="h2" align="center" color="rgb(155, 21, 59)">
                Add New User
            </Typography>
            <form onSubmit={submitForm}>
                <TextField
                    label="Username"
                    value={username}
                    placeholder="Username"
                    required
                    fullWidth
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Name"
                    value={name}
                    placeholder="Name"
                    required
                    fullWidth
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Email"
                    value={email}
                    placeholder="Email"
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Address"
                    value={address}
                    placeholder="Address"
                    fullWidth
                    onChange={(e) => setAddress(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Phone"
                    value={phone}
                    placeholder="Phone"
                    fullWidth
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!username || !name }
                        sx={{ bgcolor: '#4CAF50', color: 'white', borderRadius: '10px', '&:hover': { bgcolor: 'rgb(155, 21, 59)' } }}
                    >
                        Send
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default AddUser;
