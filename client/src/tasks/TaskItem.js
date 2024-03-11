import Axios from "axios";
import { MdDeleteOutline, MdDelete, MdOutlineEdit, MdOutlineTaskAlt } from "react-icons/md";


const TaskItem = ({ task, fetchTasks, sortBy, sortTasks }) => {

    const deleteTask = async () => {
        const { data: responseData } = await Axios.delete("http://localhost:5600/api/tasks", {
            data: { id: task._id }
        })
        fetchTasks()
        sortTasks(sortBy)
        console.log(responseData);
    }

    // const completeTask = async () =>{
    //     const {data} = await Axios.put(`http://localhost:5600/api/tasks/${task._id}`, {complete: !complete})
    //     fetchTasks()
    //     sortTasks("alphabeta")
    // }

    return <div className="task_item">
        <h2> {task.title} </h2> <p>{task._id}</p>
        <div className="div_buttons">
            <button className="btn_complete" title="completed task" onClick={() => { task.complete = !task.complete; fetchTasks() }} ><MdOutlineTaskAlt /> {task.complete && "comleted"} </button>
            <button onClick={deleteTask} className="btn_delete" title="delete task" ><MdDelete /> </button>
            <button className="btn_edit" title="edit task" ><MdOutlineEdit /> </button>
        </div>
        {/* onClick={editTask} 
onClick={completeTask}*/}
    </div>
}

export default TaskItem