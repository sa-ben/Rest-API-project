import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

const AddTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const { data } = await Axios.post("http://localhost:5600/api/tasks", { title, description, dueDate });
            setTitle("");
            setDescription("");
            setDueDate(new Date().toISOString().slice(0, 16));
            navigate("/tasks");
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
                Add Task
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
                    label="Description"
                    value={description}
                    placeholder="Description"
                    multiline
                    rows={4}
                    fullWidth
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Due Date"
                    value={dueDate}
                    type="date"
                    fullWidth
                    onChange={(e) => setDueDate(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                {/* <Button onClick={onClose} variant="outlined" sx={buttonStyles}>Cancel</Button> */}
                {/* <button type="button" onClick={handleCancel}>Cancel</button> */}
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={title === ""}
                        sx={{ bgcolor: '#4CAF50', color: 'white', borderRadius: '10px', '&:hover': { bgcolor: 'rgb(155, 21, 59)' } }}
                    >
                        Send
                    </Button>
                </Box>
            </form>
        </Box>
        
    );
};

export default AddTask;
