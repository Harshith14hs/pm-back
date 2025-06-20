import React from 'react';
import ProjectCard from './ProjectCard';
import './ProjectBoard.css';

const demoProjects = [
  { name: 'Web Designing', description: 'Prototyping', progress: 90, date: 'July 2, 2020', timeLeft: '2 Days Left' },
  { name: 'Mobile App', description: 'Design', progress: 30, date: 'July 5, 2020', timeLeft: '3 week left' },
  { name: 'Dashboard', description: 'Medical', progress: 50, date: 'July 10, 2020', timeLeft: '2 week left' },
  { name: 'Web Designing', description: 'Wireframing', progress: 20, date: 'July 15, 2020', timeLeft: '1 week left' },
];

const ProjectBoard = () => (
  <div className="project-board">
    <div className="project-summary-row">
      <div className="project-summary-item">
        <div className="summary-value">45</div>
        <div className="summary-label">In Progress</div>
      </div>
      <div className="project-summary-item">
        <div className="summary-value">12</div>
        <div className="summary-label">In Progress</div>
      </div>
      <div className="project-summary-item">
        <div className="summary-value">10</div>
        <div className="summary-label">Upcoming</div>
      </div>
      <div className="project-summary-item">
        <div className="summary-value">67</div>
        <div className="summary-label">Total Project</div>
      </div>
    </div>
    <div className="project-card-grid">
      {demoProjects.map((project, idx) => (
        <ProjectCard key={idx} project={project} colorIdx={idx} />
      ))}
    </div>
  </div>
);

export default ProjectBoard; 