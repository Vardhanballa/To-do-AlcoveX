// src/components/MainPanel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MainPanel.css';
import Modal from 'react-modal'; 

const MainPanel = ({ projectId, projectTitle, onProjectTitleClick }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    startDate: '',
    deadline: '',
    status: 'To Do',
  });
  const [editTask, setEditTask] = useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (projectId) {
          const response = await axios.get(`http://localhost:5000/tasks/project/${projectId}`);
          setTasks(response.data);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [projectId]);

  const handleAddTask = async () => {
    try {
      if (projectId) {
        const response = await axios.post(`http://localhost:5000/tasks/add`, {
          ...newTask,
          projectId,
        });

        const addedTask = response.data;
        setTasks([...tasks, addedTask]);
        setNewTask({
          title: '',
          startDate: '',
          deadline: '',
          status: 'To Do',
        });
        setIsAddingTask(false); 
      } else {
        console.error('Project ID is missing.');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/delete/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const openEditModal = (task) => {
    setEditTask(task);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditTask(null);
    setEditModalIsOpen(false);
  };

  const handleEditTask = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/tasks/update/${editTask.id}`, {
        ...editTask,
      });

      const updatedTask = response.data;
      setTasks(tasks.map((task) => (task.id === editTask.id ? updatedTask : task)));

      closeEditModal();
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditTask({
      ...editTask,
      [name]: value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const filterTasksByStatus = (status) => tasks.filter((task) => task.status.toLowerCase() === status.toLowerCase());

  return (
    <div className="main-panel">
      {projectTitle && (
        <h1 className="project-title center" onClick={() => onProjectTitleClick(projectId)}>
          {projectTitle}
        </h1>
      )}

      {projectId && (
        <div className="add-new-task">
          {!isAddingTask ? (
            <h3 className="add-task-button" onClick={() => setIsAddingTask(true)}>+ Add New Task</h3>
          ) : (
            <div className="add-new-task-prompt">
              <input
                type="text"
                placeholder="Task Name"
                name="title"
                value={newTask.title}
                onChange={(e) => handleInputChange(e)}
              />
              <input
                type="date"
                placeholder="Start Date"
                name="startDate"
                value={newTask.startDate}
                onChange={(e) => handleInputChange(e)}
              />
              <input
                type="date"
                placeholder="Deadline"
                name="deadline"
                value={newTask.deadline}
                onChange={(e) => handleInputChange(e)}
              />
              <select
                name="status"
                value={newTask.status}
                onChange={(e) => handleInputChange(e)}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
                <option value="Completed">Completed</option>
              </select>
              <button className="add-task-button" onClick={handleAddTask}>Add Task</button>
              <button className="cancel-button" onClick={() => setIsAddingTask(false)}>Cancel</button>
            </div>
          )}
        </div>
      )}

      <div className="columns-container">
        <div className="column">
          <h2 className="column-title">To Do</h2>
          {filterTasksByStatus('To Do').map((task) => (
          <div key={task.id} className="task">
            <div className="task-details">
              <div>
                <strong>{task.title}</strong>
              </div>
              <div>
                <span>Start Date:</span> {new Date(task.start_date).toLocaleDateString()}
              </div>
              <div>
                <span>Deadline:</span> {new Date(task.end_date).toLocaleDateString()}
              </div>
            </div>
            <div className="task-buttons">
              <button className="edit" onClick={() => openEditModal(task)}>Edit</button>
              <button className="delete" onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
        </div>

        <div className="column">
          <h2 className="column-title">In Progress</h2>
          {filterTasksByStatus('In Progress').map((task) => (
          <div key={task.id} className="task">
            <div className="task-details">
              <div>
                <strong>{task.title}</strong>
              </div>
              <div>
                <span>Start Date:</span> {new Date(task.start_date).toLocaleDateString()}
              </div>
              <div>
                <span>Deadline:</span> {new Date(task.end_date).toLocaleDateString()}
              </div>
            </div>
            <div className="task-buttons">
              <button className="edit" onClick={() => openEditModal(task)}>Edit</button>
              <button className="delete" onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
        </div>
        <div className="column">
           <h2 className="column-title">In Review</h2>
           {filterTasksByStatus('In Review').map((task) => (
          <div key={task.id} className="task">
            <div className="task-details">
              <div>
                <strong>{task.title}</strong>
              </div>
              <div>
                <span>Start Date:</span> {new Date(task.start_date).toLocaleDateString()}
              </div>
              <div>
                <span>Deadline:</span> {new Date(task.end_date).toLocaleDateString()}
              </div>
            </div>
            <div className="task-buttons">
              <button className="edit" onClick={() => openEditModal(task)}>Edit</button>
              <button className="delete" onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
        </div>
        <div className="column">
          <h2 className="column-title">Completed</h2>
          {filterTasksByStatus('Completed').map((task) => (
          <div key={task.id} className="task">
            <div className="task-details">
              <div>
                <strong>{task.title}</strong>
              </div>
              <div>
                <span>Start Date:</span> {new Date(task.start_date).toLocaleDateString()}
              </div>
              <div>
                <span>Deadline:</span> {new Date(task.end_date).toLocaleDateString()}
              </div>
            </div>
            <div className="task-buttons">
              <button className="edit" onClick={() => openEditModal(task)}>Edit</button>
              <button className="delete" onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
        </div>
      </div>

      {editTask && (
        <Modal
          isOpen={editModalIsOpen}
          onRequestClose={closeEditModal}
          contentLabel="Edit Task Modal"
          className="edit-modal center"
        >
          <h2>Edit Task</h2>
           <div>
             <label>Title:</label>
             <input
              type="text"
              name="title"
              value={editTask.title}
              onChange={(e) => handleEditInputChange(e)}
            />
          </div>
          <div>
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={editTask.startDate}
              onChange={(e) => handleEditInputChange(e)}
            />
          </div>
          <div>
            <label>Deadline:</label>
            <input
              type="date"
              name="deadline"
              value={editTask.deadline}
              onChange={(e) => handleEditInputChange(e)}
            />
          </div>
          <div>
            <label>Status:</label>
            <select
              name="status"
              value={editTask.status}
              onChange={(e) => handleEditInputChange(e)}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="In Review">In Review</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button className="save-button" onClick={handleEditTask}>Save Changes</button>
          <button className="cancel" onClick={closeEditModal}>
            Cancel
          </button>
        </Modal>
      )}
    </div>
  );
};

export default MainPanel;
