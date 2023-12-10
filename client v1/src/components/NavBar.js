// // src/components/NavBar.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import './NavBar.css';

// const NavBar = ({ projects, selectedProject, onSelectProject, onAddProject }) => {
//   const [newProjectName, setNewProjectName] = useState('');
//   const [isAddingProject, setIsAddingProject] = useState(false);

//   const handleAddProject = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/projects/add', {
//         name: newProjectName,
//       });

//       const newProject = response.data;
//       onAddProject(newProject);
//       setNewProjectName('');
//       setIsAddingProject(false);
//     } catch (error) {
//       console.error('Error adding project:', error);
//     }
//   };

//   return (
//     <nav>
//       <ul className="list-group">
//         {projects.map((project) => (
//           <li
//             key={project.id}
//             onClick={() => onSelectProject(project)}
//             className={`list-group-item ${
//               selectedProject && selectedProject.id === project.id ? 'active' : ''
//             }`}
//           >
//             {project.name}
//           </li>
//         ))}
//         <li className="list-group-item">
//           <button
//             className="btn btn-primary"
//             onClick={() => setIsAddingProject(true)}
//           >
//             + Add new project
//           </button>
//           {isAddingProject && (
//             <div>
//               <input
//                 type="text"
//                 className="form-control mt-2"
//                 placeholder="Enter project title"
//                 value={newProjectName}
//                 onChange={(e) => setNewProjectName(e.target.value)}
//               />
//               <button
//                 className="btn btn-success mt-2"
//                 onClick={handleAddProject}
//               >
//                 Add
//               </button>
//             </div>
//           )}
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default NavBar;

// src/components/NavBar.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import './NavBar.css';

// const NavBar = ({ projects, selectedProject, onSelectProject, onAddProject }) => {
//   const [newProjectName, setNewProjectName] = useState('');
//   const [isAddingProject, setIsAddingProject] = useState(false);

//   const handleAddProject = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/projects/add', {
//         name: newProjectName,
//       });

//       const newProject = response.data;
//       onAddProject(newProject);
//       setNewProjectName('');
//       setIsAddingProject(false);
//     } catch (error) {
//       console.error('Error adding project:', error);
//     }
//   };

//   return (
//     <nav>
//       <ul className="list-group">
//         {projects.map((project) => (
//           <li
//             key={project.id}
//             onClick={() => onSelectProject(project)}
//             className={`list-group-item ${selectedProject && selectedProject.id === project.id ? 'active' : ''}`}
//           >
//             {project.name}
//           </li>
//         ))}
//         <li className="list-group-item">
//           <button
//             className="btn btn-primary"
//             onClick={() => setIsAddingProject(true)}
//           >
//             + Add new project
//           </button>
//           {isAddingProject && (
//             <div>
//               <input
//                 type="text"
//                 className="form-control mt-2"
//                 placeholder="Enter project title"
//                 value={newProjectName}
//                 onChange={(e) => setNewProjectName(e.target.value)}
//               />
//               <button
//                 className="btn btn-success mt-2"
//                 onClick={handleAddProject}
//               >
//                 Add
//               </button>
//             </div>
//           )}
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default NavBar;

// src/components/NavBar.js
import React, { useState } from 'react';
import axios from 'axios';
import './NavBar.css';

const NavBar = ({ projects, selectedProject, onSelectProject, onAddProject }) => {
  const [newProjectName, setNewProjectName] = useState('');
  const [isAddingProject, setIsAddingProject] = useState(false);

  const handleAddProject = async () => {
    try {
      const response = await axios.post('http://localhost:5000/projects/add', {
        name: newProjectName,
      });

      const newProject = response.data;
      onAddProject(newProject);
      setNewProjectName('');
      setIsAddingProject(false);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <nav>
      <ul className="list-group">
        {projects.map((project) => (
          <li
            key={project.id}
            onClick={() => {
              console.log('Selected Project:', project);
              onSelectProject(project)}}
            className={`list-group-item ${selectedProject && selectedProject.id === project.id ? 'active' : ''}`}
          >
            {project.name}
          </li>
        ))}
        <li className="list-group-item">
          <button
            className="btn btn-primary"
            onClick={() => setIsAddingProject(true)}
          >
            + Add new project
          </button>
          {isAddingProject && (
            <div>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Enter project title"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
              />
              <button
                className="btn btn-success mt-2"
                onClick={handleAddProject}
              >
                Add
              </button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
