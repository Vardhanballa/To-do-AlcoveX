// server/routes/tasks.js

const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    const { title, startDate, deadline, status } = req.body;
    const projectId = req.body.projectId; 

    console.log('Received projectId:', projectId);

    // Format date values to match PostgreSQL DATE type
    const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
    const formattedDeadline = new Date(deadline).toISOString().split('T')[0];

    // Ensure that formattedStartDate is defined here
    console.log('Formatted Start Date:', formattedStartDate);

    const newTask = await Task.createTask(title, formattedStartDate, formattedDeadline, status, projectId);
    res.json(newTask);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;



router.get('/project/:projectId', async (req, res) => {
    const { projectId } = req.params;
    try {
        const tasks = await Task.getTasksByProject(projectId);
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/status/:status', async (req, res) => {
  const { status } = req.params;
  try {
    const tasks = await Task.getTasksByStatus(status);
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Update a task by ID
router.put('/update/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, startDate, deadline, status } = req.body;

    const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
    const formattedDeadline = new Date(deadline).toISOString().split('T')[0];

    const updatedTask = await Task.updateTask(taskId, title, formattedStartDate, formattedDeadline, status);
    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.getTaskById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error fetching task by ID:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

// Delete a task by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    await Task.deleteTask(taskId);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
