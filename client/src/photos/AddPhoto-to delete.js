import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

const AddPhoto = () => {
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("http://localhost:5600/"); 
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const { data } = await Axios.post("http://localhost:5600/api/photos", { title, imageUrl });
            setTitle("");
            setImageUrl("");
            navigate("/photos");
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
                Add New Photo
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
                    label="Image URL"
                    value={imageUrl}
                    placeholder="image URL"
                    multiline
                    rows={4}
                    fullWidth
                    onChange={(e) => setImageUrl(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={title === "" || imageUrl === ""}
                        sx={{ bgcolor: '#4CAF50', color: 'white', borderRadius: '10px', '&:hover': { bgcolor: 'rgb(155, 21, 59)' } }}
                    >
                        Send
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default AddPhoto;

