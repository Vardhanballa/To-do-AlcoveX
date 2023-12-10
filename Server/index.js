// server/index.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const tasksRoute = require('./routes/tasks');
const projectsRoute = require('./routes/projects');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());
app.use('/tasks', tasksRoute);
app.use('/projects', projectsRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
