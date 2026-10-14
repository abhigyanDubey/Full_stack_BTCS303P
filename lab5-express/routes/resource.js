const express = require("express");
const router = express.Router();

let tasks = [
  { id: 1, title: "Complete Lab Sheet 5", completed: false },
  { id: 2, title: "Test API", completed: false }
];

// GET all tasks
router.get("/", (req, res) => {
  res.json(tasks);
});

// GET task by ID
router.get("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    const err = new Error("Task not found");
    err.status = 404;
    return next(err);
  }
  res.json(task);
});

// POST new task
router.post("/", (req, res) => {
  const { title, completed = false } = req.body;
  const newTask = {
    id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    title: title || "New Task",
    completed: Boolean(completed)
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update task
router.put("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    const err = new Error("Task not found");
    err.status = 404;
    return next(err);
  }
  const { title, completed } = req.body;
  if (title !== undefined) tasks[index].title = title;
  if (completed !== undefined) tasks[index].completed = Boolean(completed);
  res.json(tasks[index]);
});

// DELETE task
router.delete("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    const err = new Error("Task not found");
    err.status = 404;
    return next(err);
  }
  const deleted = tasks.splice(index, 1)[0];
  res.json(deleted);
});

module.exports = router;
