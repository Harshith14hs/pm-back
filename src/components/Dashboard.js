import React from 'react';
import './Dashboard.css';
import ProjectTaskBoard from './ProjectTaskBoard';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <span className="dashboard-subtitle">School Management</span>
      </div>
      <ProjectTaskBoard />
      <div className="dashboard-widgets">
        <div className="widget orange">
          <div className="widget-value">1256</div>
          <div className="widget-label">Students</div>
        </div>
        <div className="widget purple">
          <div className="widget-value">102</div>
          <div className="widget-label">Teachers</div>
        </div>
        <div className="widget blue">
          <div className="widget-value">102</div>
          <div className="widget-label">Private Teachers</div>
        </div>
        <div className="widget darkblue">
          <div className="widget-value">$62532</div>
          <div className="widget-label">Total Avenue</div>
        </div>
      </div>
      <div className="dashboard-main">
        <div className="dashboard-charts">
          <div className="chart-card">
            <div className="chart-title">Management Value</div>
            <div className="chart-placeholder">[Line Chart]</div>
          </div>
          <div className="chart-card">
            <div className="chart-title">Earning/Absent/Present</div>
            <div className="chart-placeholder">[Pie Chart]</div>
          </div>
        </div>
        <div className="dashboard-tasks">
          <div className="task-card">
            <div className="task-title">Subject Task</div>
            <div className="task-bars">
              <div className="task-bar math"><span>Mathematics</span><div className="bar" style={{width:'80%'}}></div></div>
              <div className="task-bar eng"><span>English</span><div className="bar" style={{width:'92%'}}></div></div>
              <div className="task-bar phy"><span>Physics</span><div className="bar" style={{width:'71%'}}></div></div>
              <div className="task-bar eng2"><span>English 02</span><div className="bar" style={{width:'90%'}}></div></div>
              <div className="task-bar isl"><span>Islam</span><div className="bar" style={{width:'96%'}}></div></div>
            </div>
          </div>
          <div className="top-students-card">
            <div className="task-title">Top Students</div>
            <ul className="top-students-list">
              <li>Lucas Jones <span>All over score: 90%</span></li>
              <li>Lucas Jones <span>All over score: 90%</span></li>
              <li>Lucas Jones <span>All over score: 90%</span></li>
            </ul>
          </div>
        </div>
        <div className="dashboard-calendar">
          <div className="calendar-card">
            <div className="calendar-title">January 2020</div>
            <div className="calendar-placeholder">[Calendar]</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 