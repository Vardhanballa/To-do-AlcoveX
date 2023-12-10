// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import NavBar from './components/NavBar';
import MainPanel from './components/MainPanel';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch projects from the backend API
    axios.get('http://localhost:5000/projects/all')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  useEffect(() => {
    // Fetch tasks for the selected project
    if (selectedProject) {
      axios.get(`http://localhost:5000/tasks/project/${selectedProject.id}`)
        .then(response => setTasks(response.data))
        .catch(error => console.error('Error fetching tasks:', error));
    } else {
      setTasks([]); // Clear tasks if no project is selected
    }
  }, [selectedProject]);

  const handleSelectProject = async (project) => {
    setSelectedProject(project);
    try {
      const response = await axios.get(`http://localhost:5000/tasks/project/${project.id}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <NavBar
          projects={projects}
          onSelectProject={handleSelectProject}
          onAddProject={handleAddProject}
        />
        <MainPanel projectId={selectedProject ? selectedProject.id : null} />
      </div>
    </div>
  );
};

export default App;
