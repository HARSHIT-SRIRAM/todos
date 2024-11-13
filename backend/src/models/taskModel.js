const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  notes: { type: String, required: true },
  time: { type: Date, default: Date.now },
  dueDate: { type: Date },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  status: {
    type: String,
    enum: ["done", "pending", "in progress", "completed"],
    default: "pending",
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: {
    type: String,
    enum: [
      "personal",
      "work",
      "education",
      "health",
      "shopping",
      "finance",
      "event",
      "other",
    ],
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
