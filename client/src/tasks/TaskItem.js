import Axios from "axios";
import { MdDelete, MdOutlineEdit, MdOutlineTaskAlt } from "react-icons/md";

const TaskItem = ({ task, fetchTasks, sortBy, sortTasks }) => {

    const deleteTask = async () => {
        const { data: responseData } = await Axios.delete("http://localhost:5600/api/tasks", {
            data: { id: task._id }
        })
        fetchTasks()
        sortTasks(sortBy)
        console.log(responseData);
    }

    const completeTask = async () => {
        try {
            const { data } = await Axios.put(`http://localhost:5600/api/tasks/${task._id}`, { ...task, complete: !task.complete })
            fetchTasks()
            sortTasks("alphabeta")
            console.log(data)
        } catch (error) {
            console.error("Error updating task:", error)
        }
    };


    return <div className="task_item">
        <h2> {task.title} </h2>
        <h5> {task.description} </h5>
        <p> id: {task._id}</p>
        <p> {task.complete ? 'completed' : 'awaiting'} </p>
        <div className="div_buttons">
            <button className={task.complete? "btn_completed" : "btn_complete"} title="complete task" onClick={completeTask} disabled={task.complete}>
                <MdOutlineTaskAlt /> {task.complete && "completed"}
            </button>
            <button className="btn_delete" title="delete task" onClick={deleteTask}>
                <MdDelete />
            </button>
            <button className="btn_edit" title="edit task">
                <MdOutlineEdit />
            </button>
        </div>
    </div>
}

export default TaskItem