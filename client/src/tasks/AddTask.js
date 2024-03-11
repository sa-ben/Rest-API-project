import { useState } from "react"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
const AddTask = () => {
    const [title, setTitle] = useState("")
    // const [values, setValues] = useState({
    //     ...
    // })
const navigate = useNavigate()

    const submitForm = async (e) => {
        e.preventDefault()
        const {data} = await Axios.post("http://localhost:5600/api/tasks",{title})
        setTitle("")
        navigate("/tasks")
        console.log(data);
    }

    return <>
        <form onSubmit={submitForm}>
            <input value={title} placeholder="add title" required={true} onChange={(e) => setTitle(e.target.value)} />
            <button type="sumbit" disabled={title===""}> send</button>
        </form>
    </>
}

export default AddTask