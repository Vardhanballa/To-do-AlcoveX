// server/routes/projects.js

const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

router.post('/add', async (req, res) => {
    const { name } = req.body;
    try {
        const newProject = await Project.createProject(name);
        res.json(newProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/all', async (req, res) => {
    try {
        const projects = await Project.getAllProjects();
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
