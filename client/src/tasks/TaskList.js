import { useEffect, useState } from "react"
import Axios from 'axios'
import { Link } from 'react-router-dom'
import TaskItem from "./TaskItem"
import { FiFilter } from "react-icons/fi";


const TasksList = () => {
    const [tasks, setTasks] = useState([])
    const [sortBy, setSortBy] = useState('')
    const [filterValue, setFilterValue] = useState('')

    const fetchTasks = async () => {
        try {
            const { data } = await Axios.get("http://localhost:5600/api/tasks");
            const filteredData = data.filter(el => el.title.includes(filterValue)) // Filter by 'title' containing the entered text
            setTasks(filteredData)
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks()
    }, [filterValue])

    const sortTasks = (sortBy) => {
        switch (sortBy) {
            case "alphabeta":
                tasks.sort((a, b) => a.title.localeCompare(b.title))
                break;
            case "completed": // הצג לי את המשימות שלא בוצעו תחילה
                tasks.sort(el => !el.complete)
                break;
            case "random":
                tasks.sort(() => Math.random() - 0.5)
                break;
            default:
                tasks.sort((a, b) => a._id.localeCompare(b._id))
                break;
        }
        console.log(`sorted by ${sortBy} successfully`);
        setTasks([...tasks]);
    }

    useEffect(() => {
        sortTasks(sortBy)
    }, [sortBy])

    // if (tasks.length === 0) return <h1>Loading</h1>

    return <>
        <div className="tasksList">
            <div className="tasks_header">
                <div className="div_sort">
                    <FiFilter style={{ height: "80px" }} />
                    <select className="selectList" onChange={(e) => setSortBy(e.target.value)}>
                        <option value="id"> id </option>
                        <option value="alphabeta"> a-z </option>
                        <option value="completed"> completed </option>
                        <option value="random"> random </option>
                    </select>
                </div>
                <input className="inpSearch" placeholder="search" onChange={(e) => setFilterValue(e.target.value)} />
                <button className="btnAddNewTask"> <Link style={{ color: "white" }} to='/tasks/add'> Add new task</Link> </button>
            </div>
            <h1> Tasks List </h1>
            {/* <Link to='/tasks/add'> Add new task</Link> */}
            {(tasks.length) ?
                tasks.map((task, index) => <TaskItem key={task._id} task={task} fetchTasks={fetchTasks} sortBy={sortBy} sortTasks={sortTasks} />)
                : <h2> No tasks found </h2>
            }
        </div>
    </>
}

export default TasksList