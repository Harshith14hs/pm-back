const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate('createdBy', 'username email').sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get projects for the logged-in user
router.get('/mine', auth, async (req, res) => {
  try {
    console.log('GET /api/projects/mine for user:', req.user._id);
    const projects = await Project.find({ createdBy: req.user._id }).populate('createdBy', 'username email').sort({ createdAt: -1 });
    console.log('Projects returned:', projects.map(p => ({ id: p._id, name: p.name, createdBy: p.createdBy })));
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new project
router.post('/', auth, async (req, res) => {
  const project = new Project({
    name: req.body.name,
    description: req.body.description,
    status: req.body.status || 'active',
    createdBy: req.user._id
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a project
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (req.body.name) project.name = req.body.name;
    if (req.body.description) project.description = req.body.description;
    if (req.body.status) project.status = req.body.status;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.deleteOne();
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 