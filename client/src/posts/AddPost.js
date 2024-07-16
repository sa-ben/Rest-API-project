import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("")
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const { data } = await Axios.post("http://localhost:5600/api/posts", { title, body });
            setTitle("");
            setBody("")
            navigate("/posts");
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
                value={body}
                placeholder="body"
                onChange={(e) => setBody(e.target.value)}
            />
            <button type="submit" disabled={title === ""}>Send</button>
        </form>
    );
};

export default AddPost;
