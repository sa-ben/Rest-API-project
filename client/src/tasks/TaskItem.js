import Axios from "axios";
import { useState } from "react";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import UpdateTask from "./UpdateTask";
import { IoMdDoneAll } from "react-icons/io";

const TaskItem = ({ task, fetchTasks, sortTasks }) => {

    const [openModal, setOpenModal] = useState(false)
    const [editedTitle, setEditedTitle] = useState(task.title)
    const [editedDescription, setEditedDescription] = useState(task.description)
    const [editedComplete, setEditedComplete] = useState(task.complete)
    const [editedDate, setEditedDate] = useState(task.dueDate)

    const deleteTask = async () => {
        const { data: responseData } = await Axios.delete("http://localhost:5600/api/tasks", {
            data: { id: task._id }
        })
        fetchTasks()
        console.log(responseData);
    }

    const completeTask = async () => {
        try {
            const { data } = await Axios.put(`http://localhost:5600/api/tasks/${task._id}`, { ...task, complete: !task.complete })
            fetchTasks()
            console.log(data)
        } catch (error) {
            console.error("Error updating task:", error)
        }
    }

    const updateCompleteStatus = async () => {
        try {
            const { data } = await Axios.put(`http://localhost:5600/api/tasks/${task._id}`, { ...task, complete: !editedComplete });
            fetchTasks();
            console.log(data);
        } catch (error) {
            console.error("Error updating complete status:", error);
        }
    }

    const handleEditOpen = () => setOpenModal(true)
    const handleEditClose = () => setOpenModal(false)
    const handleTitleChange = (event) => setEditedTitle(event.target.value);
    const handleDescriptionChange = (event) => setEditedDescription(event.target.value);
    const handleDateChange = (event) => setEditedDate(event.target.value);
    const handleCompleteChange = () => setEditedComplete(!editedComplete);

    const handleSaveChanges = async () => {
        try {
            const { data } = await Axios.put(`http://localhost:5600/api/tasks/${task._id}`, {
                ...task,
                title: editedTitle,
                description: editedDescription,
                dueDate: editedDate,
                complete: editedComplete
            });
            fetchTasks();
            console.log(data);
            handleEditClose();
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return <div className="task_item">
        <p className="p_id"> id: {task._id}</p>
        <h2 className={task.complete ? "title_completed" : "title_complete"}> {task.title} </h2>
        <p className="p_description"> {task.description} </p>
        <p> {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB') : ''} </p>
        <p className={task.complete ? "p_completed" : "p_complete"}> {task.complete ? 'completed' : 'awaiting to be done'} </p>
        <div className="div_buttons">
            <button className="btn_delete" title="delete task" onClick={deleteTask}>
                <MdDelete />
            </button>
            <button className="btn_edit"
                title="edit task"
                onClick={handleEditOpen}>
                <MdOutlineEdit />
            </button>
            <button className={task.complete ? "btn_completed" : "btn_complete"}
                title="complete task"
                onClick={completeTask}
                disabled={task.complete}>
                <IoMdDoneAll />
            </button>
        </div>
        <UpdateTask
            isOpen={openModal}
            onClose={handleEditClose}
            task={task}
            editedTitle={editedTitle}
            editedDescription={editedDescription}
            editedDate={editedDate}
            editedComplete={editedComplete}
            onTitleChange={handleTitleChange}
            onDescriptionChange={handleDescriptionChange}
            onDateChange={handleDateChange}
            onCompleteChange={handleCompleteChange}
            onSaveChanges={handleSaveChanges}
        />
    </div>
}

export default TaskItem