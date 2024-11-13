const express = require("express");
const taskController = require("../controllers/taskControllers");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new task
router.post("/", authenticateToken, taskController.createTask);

// Get all tasks for a user
router.get("/", authenticateToken, taskController.getTasks);

// Update a task by ID
router.put("/:id", authenticateToken, taskController.updateTask);

// Delete a task by ID
router.delete("/:id", authenticateToken, taskController.deleteTask);

// Update the status of a task by ID
router.patch("/:id/status", authenticateToken, taskController.updateTaskStatus);

module.exports = router;
