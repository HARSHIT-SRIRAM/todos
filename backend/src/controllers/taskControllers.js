const Task = require("../models/taskModel");

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, notes, dueDate, priority, status, type } = req.body;
    const userId = req.user.userId;

    // Validate required fields
    if (!title || !notes || !type) {
      return res
        .status(400)
        .json({ message: "Title, notes, and type are required." });
    }

    const task = new Task({
      title,
      notes,
      dueDate,
      priority,
      status,
      type,
      userId,
    });

    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all tasks for a user
const getTasks = async (req, res) => {
  try {
    const userId = req.user.userId;
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a task by ID
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, notes, dueDate, priority, status, type } = req.body;

    const task = await Task.findByIdAndUpdate(
      id,
      { title, notes, dueDate, priority, status, type },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update the status of a task
const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (!["done", "pending", "in progress", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    task.status = status;
    await task.save();

    res.status(200).json({ message: "Task status updated", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
};
