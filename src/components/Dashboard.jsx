import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import HelplineNumber from './HelplineNumber';
import './Dashboard.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = ({ user }) => {
  const [progressData, setProgressData] = useState({
    subjects: [
      { name: 'Mathematics', progress: 75, goal: 100 },
      { name: 'Science', progress: 60, goal: 100 },
      { name: 'Programming', progress: 85, goal: 100 },
      { name: 'English', progress: 45, goal: 100 }
    ],
    weeklyHours: [8, 12, 6, 15, 10, 8, 14],
    skills: [
      { name: 'Problem Solving', level: 80 },
      { name: 'Critical Thinking', level: 65 },
      { name: 'Creativity', level: 70 },
      { name: 'Communication', level: 55 }
    ],
    assignmentScores: [85, 92, 78, 88, 95],
    timeDistribution: {
      studying: 35,
      projects: 25,
      research: 20,
      breaks: 15,
      other: 5
    },
    monthlyProgress: [65, 72, 68, 75, 82, 78, 85, 88, 82, 86, 90, 85],
    assignments: [
      { id: 1, title: 'Math Homework - Algebra', subject: 'Mathematics', submittedDate: '2024-01-15', status: 'Graded', score: 85, total: 100 },
      { id: 2, title: 'Science Lab Report', subject: 'Science', submittedDate: '2024-01-14', status: 'Graded', score: 92, total: 100 },
      { id: 3, title: 'Programming Project', subject: 'Programming', submittedDate: '2024-01-13', status: 'Graded', score: 78, total: 100 },
      { id: 4, title: 'Essay Writing', subject: 'English', submittedDate: '2024-01-12', status: 'Under Review', score: null, total: 100 },
      { id: 5, title: 'Research Paper', subject: 'Science', submittedDate: '2024-01-10', status: 'Graded', score: 88, total: 100 },
      { id: 6, title: 'Code Challenge', subject: 'Programming', submittedDate: '2024-01-08', status: 'Graded', score: 95, total: 100 }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(progressData);

  useEffect(() => {
    const savedData = localStorage.getItem('progressData');
    if (savedData) {
      setProgressData(JSON.parse(savedData));
      setEditData(JSON.parse(savedData));
    }
  }, []);

  const handleSave = () => {
    setProgressData(editData);
    localStorage.setItem('progressData', JSON.stringify(editData));
    setIsEditing(false);
  };

  const handleEdit = (type, index, field, value) => {
    const newData = { ...editData };
    if (type === 'subjects') {
      newData.subjects[index][field] = parseInt(value) || 0;
    } else if (type === 'weeklyHours') {
      newData.weeklyHours[index] = parseInt(value) || 0;
    } else if (type === 'skills') {
      newData.skills[index][field] = parseInt(value) || 0;
    } else if (type === 'assignmentScores') {
      newData.assignmentScores[index] = parseInt(value) || 0;
    } else if (type === 'timeDistribution') {
      newData.timeDistribution[field] = parseInt(value) || 0;
    } else if (type === 'monthlyProgress') {
      newData.monthlyProgress[index] = parseInt(value) || 0;
    }
    setEditData(newData);
  };

  // Chart data configurations
  const weeklyHoursChart = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Study Hours',
        data: progressData.weeklyHours,
        backgroundColor: '#2c5aa0',
        borderColor: '#2c5aa0',
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  };

  const monthlyProgressChart = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Progress (%)',
        data: progressData.monthlyProgress,
        borderColor: '#28a745',
        backgroundColor: 'rgba(40, 167, 69, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const timeDistributionChart = {
    labels: Object.keys(progressData.timeDistribution),
    datasets: [
      {
        data: Object.values(progressData.timeDistribution),
        backgroundColor: [
          '#2c5aa0',
          '#28a745',
          '#fd7e14',
          '#6f42c1',
          '#e83e8c'
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const assignmentScoresChart = {
    labels: ['Assignment 1', 'Assignment 2', 'Assignment 3', 'Assignment 4', 'Assignment 5'],
    datasets: [
      {
        label: 'Scores',
        data: progressData.assignmentScores,
        backgroundColor: '#fd7e14',
        borderColor: '#fd7e14',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Study Analytics',
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Graded': return '#28a745';
      case 'Under Review': return '#fd7e14';
      case 'Submitted': return '#17a2b8';
      case 'Late': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header fade-in">
        <h1>Welcome back, {user?.name}! 👋</h1>
        <p>Track your learning progress and achievements</p>
      </div>

      <div className="dashboard-content">
        {/* Progress Overview */}
        <div className="stats-grid">
          <div className="stat-card glass-card">
            <h3>Total Subjects</h3>
            <div className="stat-value">{progressData.subjects.length}</div>
          </div>
          <div className="stat-card glass-card">
            <h3>Average Progress</h3>
            <div className="stat-value">
              {Math.round(progressData.subjects.reduce((acc, subject) => acc + subject.progress, 0) / progressData.subjects.length)}%
            </div>
          </div>
          <div className="stat-card glass-card">
            <h3>Weekly Hours</h3>
            <div className="stat-value">
              {progressData.weeklyHours.reduce((acc, hours) => acc + hours, 0)}
            </div>
          </div>
          <div className="stat-card glass-card">
            <h3>Assignments</h3>
            <div className="stat-value">
              {progressData.assignments.length}
            </div>
          </div>
        </div>

        {/* Subject Progress and Assignments Side by Side */}
        <div className="progress-assignments-grid">
          {/* Subject Progress - Smaller Block */}
          <div className="subject-progress-section glass-card">
            <div className="section-header">
              <h2>Subject Progress</h2>
              {isEditing && (
                <button className="btn-primary save-mini" onClick={handleSave}>
                  Save
                </button>
              )}
            </div>
            <div className="compact-progress-grid">
              {progressData.subjects.map((subject, index) => (
                <div key={subject.name} className="compact-progress-item">
                  <div className="compact-progress-header">
                    <h4>{subject.name}</h4>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editData.subjects[index].progress}
                        onChange={(e) => handleEdit('subjects', index, 'progress', e.target.value)}
                        min="0"
                        max="100"
                        className="edit-input tiny"
                      />
                    ) : (
                      <span className="progress-percent">{subject.progress}%</span>
                    )}
                  </div>
                  <div className="compact-progress-bar">
                    <div 
                      className="compact-progress-fill"
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assignments List - New Block */}
          <div className="assignments-section glass-card">
            <div className="section-header">
              <h2>Recent Submissions</h2>
              <span className="assignments-count">
                {progressData.assignments.length} assignments
              </span>
            </div>
            <div className="assignments-list">
              {progressData.assignments.map((assignment) => (
                <div key={assignment.id} className="assignment-item">
                  <div className="assignment-main">
                    <div className="assignment-title">{assignment.title}</div>
                    <div className="assignment-subject">{assignment.subject}</div>
                  </div>
                  <div className="assignment-details">
                    <div className="assignment-date">
                      {formatDate(assignment.submittedDate)}
                    </div>
                    <div 
                      className="assignment-status"
                      style={{ color: getStatusColor(assignment.status) }}
                    >
                      {assignment.status}
                    </div>
                    {assignment.score !== null ? (
                      <div className="assignment-score">
                        {assignment.score}/{assignment.total}
                      </div>
                    ) : (
                      <div className="assignment-score pending">-</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Charts Grid */}
        <div className="charts-grid">
          {/* Weekly Study Hours - Bar Chart */}
          <div className="chart-section glass-card">
            <div className="chart-header">
              <h3>Weekly Study Hours</h3>
              {isEditing && (
                <div className="chart-controls">
                  {progressData.weeklyHours.map((_, index) => (
                    <input
                      key={index}
                      type="number"
                      value={editData.weeklyHours[index]}
                      onChange={(e) => handleEdit('weeklyHours', index, null, e.target.value)}
                      className="edit-input small"
                      min="0"
                      max="24"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="chart-container">
              <Bar data={weeklyHoursChart} options={chartOptions} />
            </div>
          </div>

          {/* Monthly Progress - Line Chart */}
          <div className="chart-section glass-card">
            <div className="chart-header">
              <h3>Monthly Progress Trend</h3>
              {isEditing && (
                <div className="chart-controls">
                  <span>Edit values:</span>
                  {progressData.monthlyProgress.map((_, index) => (
                    <input
                      key={index}
                      type="number"
                      value={editData.monthlyProgress[index]}
                      onChange={(e) => handleEdit('monthlyProgress', index, null, e.target.value)}
                      className="edit-input small"
                      min="0"
                      max="100"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="chart-container">
              <Line data={monthlyProgressChart} options={chartOptions} />
            </div>
          </div>

          {/* Time Distribution - Pie Chart */}
          <div className="chart-section glass-card">
            <div className="chart-header">
              <h3>Time Distribution</h3>
              {isEditing && (
                <div className="chart-controls">
                  {Object.entries(progressData.timeDistribution).map(([key, value]) => (
                    <div key={key} className="control-item">
                      <label>{key}:</label>
                      <input
                        type="number"
                        value={editData.timeDistribution[key]}
                        onChange={(e) => handleEdit('timeDistribution', null, key, e.target.value)}
                        className="edit-input small"
                        min="0"
                        max="100"
                      />
                      <span>%</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="chart-container">
              <Doughnut data={timeDistributionChart} options={pieOptions} />
            </div>
          </div>

          {/* Assignment Scores - Bar Chart */}
          <div className="chart-section glass-card">
            <div className="chart-header">
              <h3>Assignment Scores</h3>
              {isEditing && (
                <div className="chart-controls">
                  {progressData.assignmentScores.map((_, index) => (
                    <input
                      key={index}
                      type="number"
                      value={editData.assignmentScores[index]}
                      onChange={(e) => handleEdit('assignmentScores', index, null, e.target.value)}
                      className="edit-input small"
                      min="0"
                      max="100"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="chart-container">
              <Bar data={assignmentScoresChart} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Skills Development */}
        <div className="section glass-card">
          <div className="section-header">
            <h2>Skills Development</h2>
            <button 
              className="btn-primary"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel Editing' : 'Edit Progress'}
            </button>
          </div>
          <div className="skills-grid">
            {progressData.skills.map((skill, index) => (
              <div key={skill.name} className="skill-item">
                <span className="skill-name">{skill.name}</span>
                {isEditing ? (
                  <input
                    type="number"
                    value={editData.skills[index].level}
                    onChange={(e) => handleEdit('skills', index, 'level', e.target.value)}
                    min="0"
                    max="100"
                    className="edit-input small"
                  />
                ) : (
                  <div className="skill-bar">
                    <div 
                      className="skill-fill"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                )}
                {!isEditing && <span className="skill-percent">{skill.level}%</span>}
              </div>
            ))}
          </div>
        </div>

        {/* ADD THE COMPACT HELPLINE COMPONENT HERE */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <HelplineNumber />
        </div>

        {isEditing && (
          <div className="save-section">
            <button className="btn-primary save-btn" onClick={handleSave}>
              Save All Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;