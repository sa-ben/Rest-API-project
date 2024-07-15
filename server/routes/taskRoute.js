const express = require ('express')
const router = express.Router()
const taskController = require('../controllers/taskController')

//get all tasks
router.get("/", taskController.getAllTasks)
//get specific task
router.get("/:id", taskController.getTaskById)
//create task
router.post("/",taskController.createTask)
//update task
router.put("/:id", taskController.updateTask)
//delete task
router.delete("/", taskController.deleteTask)

module.exports = router
