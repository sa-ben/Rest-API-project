import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const { data } = await Axios.post("http://localhost:5600/api/tasks", { title, description });
            setTitle("");
            setDescription("")
            navigate("/tasks");
            console.log(data);
        } catch (error) {
            console.error("Error submitting the form:", error);
        }
    };

    return (
        <form onSubmit={submitForm}>
            <input
                value={title}
                placeholder="title"
                required
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                value={description}
                placeholder="descriprion"
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit" disabled={title === ""}>Send</button>
        </form>
    );
};

export default AddTask;
