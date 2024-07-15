import Axios from "axios";
import { useState } from "react";
import { MdDelete, MdOutlineEdit, MdOutlineTaskAlt } from "react-icons/md";
import UpdateTask from "./UpdateTask";

const TaskItem = ({ task, fetchTasks, sortTasks }) => {

    const [openModal, setOpenModal] = useState(false)
    const [editedTitle, setEditedTitle] = useState(task.title)
    const [editedDescription, setEditedDescription] = useState(task.description)
    const [editedComplete, setEditedComplete] = useState(task.complete)

    const deleteTask = async () => {
        const { data: responseData } = await Axios.delete("http://localhost:5600/api/tasks", {
            data: { id: task._id }
        })
        fetchTasks()
        // sortTasks(sortBy)
        console.log(responseData);
    }

    const completeTask = async () => {
        try {
            const { data } = await Axios.put(`http://localhost:5600/api/tasks/${task._id}`, { ...task, complete: !task.complete })
            fetchTasks()
            // sortTasks("alphabeta")
            console.log(data)
        } catch (error) {
            console.error("Error updating task:", error)
        }
    }

    const updateCompleteStatus = async () => {
        try {
            const { data } = await Axios.put(`http://localhost:5600/api/tasks/${task._id}`, { ...task, complete: !editedComplete });
            fetchTasks();
            // sortTasks("alphabeta");
            console.log(data);
        } catch (error) {
            console.error("Error updating complete status:", error);
        }
    }

    const handleEditOpen = () => setOpenModal(true)
    const handleEditClose = () => setOpenModal(false)
    const handleTitleChange = (event) => setEditedTitle(event.target.value);
    const handleDescriptionChange = (event) => setEditedDescription(event.target.value);
    const handleCompleteChange = () => setEditedComplete(!editedComplete);

    const handleSaveChanges = async () => {
        try {
            const { data } = await Axios.put(`http://localhost:5600/api/tasks/${task._id}`, {
                ...task,
                title: editedTitle,
                description: editedDescription,
                complete: editedComplete
            });
            fetchTasks();
            sortTasks("alphabeta");
            console.log(data);
            handleEditClose();
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return <div className="task_item">
        <h2> {task.title} </h2>
        <h5> {task.description} </h5>
        <p> id: {task._id}</p>
        <p> status: {task.complete ? 'completed' : 'awaiting'} </p>
        <div className="div_buttons">
            <button className={task.complete ? "btn_completed" : "btn_complete"}
                title="complete task"
                onClick={completeTask}
                disabled={task.complete}>
                <MdOutlineTaskAlt />
                {task.complete && "completed"}
            </button>
            <button className="btn_delete" title="delete task" onClick={deleteTask}>
                <MdDelete />
            </button>
            <button className="btn_edit"
                title="edit task"
                onClick={handleEditOpen}>
                <MdOutlineEdit />
            </button>
        </div>
        <UpdateTask
            isOpen={openModal}
            onClose={handleEditClose}
            task={task}
            editedTitle={editedTitle}
            editedDescription={editedDescription}
            editedComplete={editedComplete}
            onTitleChange={handleTitleChange}
            onDescriptionChange={handleDescriptionChange}
            onCompleteChange={handleCompleteChange}
            onSaveChanges={handleSaveChanges}
        />
    </div>
}

export default TaskItem