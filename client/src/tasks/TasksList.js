import { useEffect, useState } from "react"
import Axios from 'axios'
import TaskItem from "./TaskItem"
import AddTask from "./AddTask"

const TasksList = () => {

    const [openModal, setOpenModal] = useState(false)
    const [tasks, setTasks] = useState([])
    const [sortBy, setSortBy] = useState('')
    const [filterValue, setFilterValue] = useState('')

    const handleOpenModal = () => setOpenModal(true)
    const handleCloseModal = () => setOpenModal(false)

    const fetchTasks = async () => {
        try {
            const { data } = await Axios.get("http://localhost:5600/api/tasks");
            const filteredData = data.filter(el => el.title.toLowerCase().includes(filterValue)) // Filter by 'title' containing the entered text
            setTasks(filteredData)
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [filterValue])

    const sortTasks = (sortBy) => {
        switch (sortBy) {
            case "alphabeta":
                tasks.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "completed":
                tasks.sort((a, b) => (a.complete === b.complete) ? 0 : a.complete ? 1 : -1);
                break;
            case "random":
                tasks.sort(() => Math.random() - 0.5);
                break;
            case "date":
                // tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
                tasks.sort((a, b) => {
                    const dateA = new Date(a.dueDate);
                    const dateB = new Date(b.dueDate);
                    if (!a.dueDate) return 1;
                    if (!b.dueDate) return -1;
                    if (!isNaN(dateA) && !isNaN(dateB)) {
                        return dateA - dateB;
                    }
                    if (isNaN(dateA)) return 1;
                    if (isNaN(dateB)) return -1;    
                    return 0;
                });
                break;
            default:
                tasks.sort((a, b) => a._id.localeCompare(b._id));
                break;
        }
        console.log(`sorted by ${sortBy} successfully`);
        setTasks([...tasks]);
    };

    useEffect(() => {
        sortTasks(sortBy)
    }, [sortBy])

    return <>
        <div className="tasksList">
            <div className="tasks_header">
                <div className="div_sort">
                    <select
                        className="selectList"
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="id"> id </option>
                        <option value="alphabeta"> a-z </option>
                        <option value="completed"> completed </option>
                        <option value="random"> random </option>
                        <option value="date"> date </option>
                    </select>
                </div>
                <input
                    className="inpSearch"
                    placeholder="search"
                    onChange={(e) => setFilterValue(e.target.value)}
                />
                <button className="btnAddNew" onClick={handleOpenModal}>
                    Add Task
                </button>
            </div>
            <h1> Tasks List </h1>
            {(tasks.length) ?
                tasks.map((task, index) =>
                    <TaskItem
                        key={task._id}
                        task={task}
                        fetchTasks={fetchTasks}
                        sortBy={sortBy}
                        sortTasks={sortTasks}
                    />)
                : <h2 style={{ width: "72vw" }}> No tasks found </h2>
            }
            <AddTask
                isOpen={openModal}
                onClose={handleCloseModal}
                fetchTasks={fetchTasks}
            />
        </div>
    </>
}

export default TasksList