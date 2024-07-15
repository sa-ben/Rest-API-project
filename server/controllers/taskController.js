const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
    const tasks = await Task.find().lean().sort('_id')
    if (!tasks?.length) return res.status(400).json({ message: 'No tasks found' })
    res.json(tasks)
}

const getTaskById = async (req, res) => {
    const { id } = req.params
    const task = await Task.findById(id).lean()
    if (!task) return res.status(400).json({ message: 'No task found' })
    res.json(task)
}

const createTask = async (req, res) => {
    const { title, description, tags, complete } = req.body
    if (!title) return res.status(404).json({ message: 'title is required' })
    const task = await Task.create({ title, description, tags,  complete })
    if (task) return res.status(201).json(task)
    else res.status(400).json({ message: 'Invalid task' })
}

const updateTask = async (req, res) => {
    const { id } = req.params
    const { title, description, tags, complete } = req.body
    if (!id || !title) return res.status(400).json({ message: 'fields are required' })
    const task = await Task.findById(id).exec()
    if (!task) return res.status(400).json({ message: 'Task no found' })
    task.title = title
    task.description = description
    task.tags = tags
    task.complete = complete

    const updatedTask = await task.save()
    res.json(`${updatedTask.title} updated`)
}

const deleteTask = async (req, res) => {
    const { id } = req.body
    // if(!id) return res.status(400).send("title is required") המורה כתבה אצלה אבל לא הבנתי מה הקשר של השם לID
    const task = await Task.findById(id).exec()
    if (!task) return res.status(400).json({ message: 'Task not found' })
    const result = await task.deleteOne()
    console.log(result);
    res.json(`Task: ${result.title} id: ${result._id} deleted successfully`)
}

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask }
