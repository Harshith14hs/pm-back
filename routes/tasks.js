const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks or tasks for a specific project via query param
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.project) {
      filter.project = req.query.project;
    }
    const tasks = await Task.find(filter)
      .populate('project', 'name')
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get tasks for a specific project
router.get('/project/:projectId', async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId })
      .populate('project', 'name')
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  console.log('POST /api/tasks called with body:', req.body);
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status || 'todo',
    project: req.body.project,
    assignedTo: req.body.assignedTo,
    deadline: req.body.deadline,
    progress1: req.body.progress1,
    progress2: req.body.progress2,
    progressType: req.body.progressType,
  });

  try {
    const newTask = await task.save();
    console.log('Task saved:', newTask);
    const populatedTask = await Task.findById(newTask._id).populate('project', 'name');
    res.status(201).json(populatedTask);
  } catch (error) {
    console.error('Error saving task:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (req.body.title) task.title = req.body.title;
    if (req.body.description) task.description = req.body.description;
    if (req.body.status) task.status = req.body.status;
    if (req.body.assignedTo) task.assignedTo = req.body.assignedTo;
    if (req.body.deadline) task.deadline = req.body.deadline;
    if (req.body.progress1 !== undefined) task.progress1 = req.body.progress1;
    if (req.body.progress2 !== undefined) task.progress2 = req.body.progress2;
    if (req.body.progressType) task.progressType = req.body.progressType;

    const updatedTask = await task.save();
    const populatedTask = await Task.findById(updatedTask._id).populate('project', 'name');
    res.json(populatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 