import React, { useState, useEffect } from 'react';
import './Attendance.css';

const Attendance = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [historySubTab, setHistorySubTab] = useState('duty'); // New state for history subtabs
  const [courses, setCourses] = useState([]);
  const [dutyLeaveForm, setDutyLeaveForm] = useState({
    type: 'lecture',
    category: '',
    purpose: '',
    proofFile: null
  });
  const [medicalLeaveForm, setMedicalLeaveForm] = useState({
    fromDate: '',
    toDate: '',
    medicalReport: null,
    fitnessCertificate: null,
    doctorName: '',
    doctorContact: '',
    doctorHospital: ''
  });
  const [dutyLeaves, setDutyLeaves] = useState([]);
  const [medicalLeaves, setMedicalLeaves] = useState([]);

  // Mock data - in real implementation, this would come from APIs
  useEffect(() => {
    // Mock course attendance data
    const mockCourses = [
      {
        id: 1,
        name: 'Mathematics',
        code: 'MATH101',
        totalClasses: 45,
        attended: 38,
        percentage: 84.4,
        lastUpdated: '2024-01-20'
      },
      {
        id: 2,
        name: 'Computer Science',
        code: 'CS201',
        totalClasses: 40,
        attended: 36,
        percentage: 90.0,
        lastUpdated: '2024-01-20'
      },
      {
        id: 3,
        name: 'Physics',
        code: 'PHY101',
        totalClasses: 42,
        attended: 35,
        percentage: 83.3,
        lastUpdated: '2024-01-19'
      },
      {
        id: 4,
        name: 'English',
        code: 'ENG101',
        totalClasses: 38,
        attended: 34,
        percentage: 89.5,
        lastUpdated: '2024-01-18'
      }
    ];

    // Mock leave history
    const mockDutyLeaves = [
      {
        id: 1,
        type: 'Lecture Basis',
        category: 'College Event',
        purpose: 'Participating in inter-college competition',
        status: 'Approved',
        appliedDate: '2024-01-15',
        approvedDate: '2024-01-16',
        proof: 'competition_letter.pdf'
      },
      {
        id: 2,
        type: 'Day Basis',
        category: 'Personal',
        purpose: 'Family function',
        status: 'Pending',
        appliedDate: '2024-01-18',
        approvedDate: null,
        proof: 'invitation_card.pdf'
      }
    ];

    const mockMedicalLeaves = [
      {
        id: 1,
        fromDate: '2024-01-10',
        toDate: '2024-01-12',
        duration: '3 days',
        status: 'Approved',
        appliedDate: '2024-01-09',
        approvedDate: '2024-01-10',
        doctorName: 'Dr. Sharma',
        doctorContact: '+91-9876543210',
        medicalReport: 'medical_report.pdf',
        fitnessCertificate: 'fitness_certificate.pdf'
      },
      {
        id: 2,
        fromDate: '2024-01-25',
        toDate: '2024-01-26',
        duration: '2 days',
        status: 'Pending',
        appliedDate: '2024-01-24',
        approvedDate: null,
        doctorName: 'Dr. Gupta',
        doctorContact: '+91-9876543211',
        medicalReport: 'fever_report.pdf',
        fitnessCertificate: 'fever_fitness.pdf'
      }
    ];

    setCourses(mockCourses);
    setDutyLeaves(mockDutyLeaves);
    setMedicalLeaves(mockMedicalLeaves);
  }, []);

  const handleDutyLeaveChange = (field, value) => {
    setDutyLeaveForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMedicalLeaveChange = (field, value) => {
    setMedicalLeaveForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDutyLeaveSubmit = (e) => {
    e.preventDefault();
    // In real implementation, this would call an API
    const newLeave = {
      id: dutyLeaves.length + 1,
      type: dutyLeaveForm.type === 'lecture' ? 'Lecture Basis' : 'Day Basis',
      category: dutyLeaveForm.category,
      purpose: dutyLeaveForm.purpose,
      status: 'Pending',
      appliedDate: new Date().toISOString().split('T')[0],
      approvedDate: null,
      proof: dutyLeaveForm.proofFile ? dutyLeaveForm.proofFile.name : 'No file'
    };
    
    setDutyLeaves([newLeave, ...dutyLeaves]);
    setDutyLeaveForm({
      type: 'lecture',
      category: '',
      purpose: '',
      proofFile: null
    });
    alert('Duty leave application submitted successfully!');
  };

  const handleMedicalLeaveSubmit = (e) => {
    e.preventDefault();
    // In real implementation, this would call an API
    const fromDate = new Date(medicalLeaveForm.fromDate);
    const toDate = new Date(medicalLeaveForm.toDate);
    const duration = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;
    
    const newLeave = {
      id: medicalLeaves.length + 1,
      fromDate: medicalLeaveForm.fromDate,
      toDate: medicalLeaveForm.toDate,
      duration: `${duration} day${duration > 1 ? 's' : ''}`,
      status: 'Pending',
      appliedDate: new Date().toISOString().split('T')[0],
      approvedDate: null,
      doctorName: medicalLeaveForm.doctorName,
      doctorContact: medicalLeaveForm.doctorContact,
      doctorHospital: medicalLeaveForm.doctorHospital,
      medicalReport: medicalLeaveForm.medicalReport ? medicalLeaveForm.medicalReport.name : 'No file',
      fitnessCertificate: medicalLeaveForm.fitnessCertificate ? medicalLeaveForm.fitnessCertificate.name : 'No file'
    };
    
    setMedicalLeaves([newLeave, ...medicalLeaves]);
    setMedicalLeaveForm({
      fromDate: '',
      toDate: '',
      medicalReport: null,
      fitnessCertificate: null,
      doctorName: '',
      doctorContact: '',
      doctorHospital: ''
    });
    alert('Medical leave application submitted successfully!');
  };

  const handleFileUpload = (field, file, isDutyLeave = true) => {
    if (file && file.type === 'application/pdf') {
      if (isDutyLeave) {
        setDutyLeaveForm(prev => ({
          ...prev,
          [field]: file
        }));
      } else {
        setMedicalLeaveForm(prev => ({
          ...prev,
          [field]: file
        }));
      }
    } else {
      alert('Please upload a PDF file.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return '#28a745';
      case 'Pending': return '#fd7e14';
      case 'Rejected': return '#dc3545';
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

  const calculateOverallAttendance = () => {
    const totalClasses = courses.reduce((sum, course) => sum + course.totalClasses, 0);
    const totalAttended = courses.reduce((sum, course) => sum + course.attended, 0);
    return totalClasses > 0 ? (totalAttended / totalClasses * 100).toFixed(1) : 0;
  };

  return (
    <div className="attendance-container">
      <div className="attendance-header fade-in">
        <h1>Attendance Management 📊</h1>
        <p>Track your attendance and manage leave applications</p>
      </div>

      <div className="attendance-content">
        {/* Navigation Tabs */}
        <div className="tabs-navigation glass-card">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📈 Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'duty-leave' ? 'active' : ''}`}
            onClick={() => setActiveTab('duty-leave')}
          >
            📋 Duty Leave
          </button>
          <button 
            className={`tab-btn ${activeTab === 'medical-leave' ? 'active' : ''}`}
            onClick={() => setActiveTab('medical-leave')}
          >
            🏥 Medical Leave
          </button>
          <button 
            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            📜 Leave History
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="tab-content">
            <div className="overview-header">
              <h2>Attendance Overview</h2>
              <p>Your current attendance across all courses</p>
            </div>

            {/* Overall Stats */}
            <div className="overall-stats glass-card">
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <div className="stat-value">{calculateOverallAttendance()}%</div>
                  <div className="stat-label">Overall Attendance</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📚</div>
                <div className="stat-info">
                  <div className="stat-value">{courses.length}</div>
                  <div className="stat-label">Total Courses</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-info">
                  <div className="stat-value">
                    {courses.filter(course => course.percentage >= 75).length}
                  </div>
                  <div className="stat-label">Courses Above 75%</div>
                </div>
              </div>
            </div>

            {/* Course-wise Attendance */}
            <div className="courses-section">
              <h3>Course-wise Attendance</h3>
              <div className="courses-grid">
                {courses.map(course => (
                  <div key={course.id} className="course-card glass-card">
                    <div className="course-header">
                      <h4>{course.name}</h4>
                      <span className="course-code">{course.code}</span>
                    </div>
                    <div className="attendance-details">
                      <div className="attendance-stats">
                        <span className="attended">{course.attended}</span>
                        <span className="separator">/</span>
                        <span className="total">{course.totalClasses}</span>
                        <span className="classes">classes</span>
                      </div>
                      <div className="attendance-percentage">
                        {course.percentage}%
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${course.percentage}%` }}
                      ></div>
                    </div>
                    <div className="course-footer">
                      <span className={`status ${course.percentage >= 75 ? 'good' : 'warning'}`}>
                        {course.percentage >= 75 ? '✅ Good' : '⚠️ Needs Improvement'}
                      </span>
                      <span className="last-updated">
                        Updated: {formatDate(course.lastUpdated)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Duty Leave Tab */}
        {activeTab === 'duty-leave' && (
          <div className="tab-content">
            <div className="leave-header">
              <h2>Apply for Duty Leave</h2>
              <p>Fill the form below to apply for duty leave</p>
            </div>

            <form onSubmit={handleDutyLeaveSubmit} className="leave-form glass-card">
              <div className="form-section">
                <h4>Leave Details</h4>
                
                <div className="form-group">
                  <label>Type *</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="type"
                        value="lecture"
                        checked={dutyLeaveForm.type === 'lecture'}
                        onChange={(e) => handleDutyLeaveChange('type', e.target.value)}
                        className="radio-input"
                      />
                      <span className="radio-custom"></span>
                      Lecture Basis
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="type"
                        value="day"
                        checked={dutyLeaveForm.type === 'day'}
                        onChange={(e) => handleDutyLeaveChange('type', e.target.value)}
                        className="radio-input"
                      />
                      <span className="radio-custom"></span>
                      Day Basis
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={dutyLeaveForm.category}
                    onChange={(e) => handleDutyLeaveChange('category', e.target.value)}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="College Event">College Event</option>
                    <option value="Sports Competition">Sports Competition</option>
                    <option value="Cultural Event">Cultural Event</option>
                    <option value="Personal">Personal</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Purpose of Duty Leave *</label>
                  <textarea
                    value={dutyLeaveForm.purpose}
                    onChange={(e) => handleDutyLeaveChange('purpose', e.target.value)}
                    placeholder="Describe the purpose of your duty leave..."
                    rows="4"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Proof Document (PDF) *</label>
                  <div className="file-upload">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileUpload('proofFile', e.target.files[0], true)}
                      id="duty-proof"
                      required
                    />
                    <label htmlFor="duty-proof" className="upload-btn">
                      {dutyLeaveForm.proofFile ? '📄 ' + dutyLeaveForm.proofFile.name : '📎 Upload Proof Document'}
                    </label>
                  </div>
                  <small>Upload supporting document (Invitation letter, Competition details, etc.)</small>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  Submit Application
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setDutyLeaveForm({
                    type: 'lecture',
                    category: '',
                    purpose: '',
                    proofFile: null
                  })}
                >
                  Reset Form
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Medical Leave Tab */}
        {activeTab === 'medical-leave' && (
          <div className="tab-content">
            <div className="leave-header">
              <h2>Apply for Medical Leave</h2>
              <p>Fill the form below to apply for medical leave</p>
            </div>

            <form onSubmit={handleMedicalLeaveSubmit} className="leave-form glass-card">
              <div className="form-section">
                <h4>Leave Period</h4>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>From Date *</label>
                    <input
                      type="date"
                      value={medicalLeaveForm.fromDate}
                      onChange={(e) => handleMedicalLeaveChange('fromDate', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>To Date *</label>
                    <input
                      type="date"
                      value={medicalLeaveForm.toDate}
                      onChange={(e) => handleMedicalLeaveChange('toDate', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4>Medical Documents</h4>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Medical Report (PDF) *</label>
                    <div className="file-upload">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload('medicalReport', e.target.files[0], false)}
                        id="medical-report"
                        required
                      />
                      <label htmlFor="medical-report" className="upload-btn">
                        {medicalLeaveForm.medicalReport ? '📄 ' + medicalLeaveForm.medicalReport.name : '📎 Upload Medical Report'}
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Fitness Certificate (PDF) *</label>
                    <div className="file-upload">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload('fitnessCertificate', e.target.files[0], false)}
                        id="fitness-certificate"
                        required
                      />
                      <label htmlFor="fitness-certificate" className="upload-btn">
                        {medicalLeaveForm.fitnessCertificate ? '📄 ' + medicalLeaveForm.fitnessCertificate.name : '📎 Upload Fitness Certificate'}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4>Doctor Information</h4>
                
                <div className="form-group">
                  <label>Doctor's Name *</label>
                  <input
                    type="text"
                    value={medicalLeaveForm.doctorName}
                    onChange={(e) => handleMedicalLeaveChange('doctorName', e.target.value)}
                    placeholder="Enter doctor's full name"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Doctor's Contact Number *</label>
                    <input
                      type="tel"
                      value={medicalLeaveForm.doctorContact}
                      onChange={(e) => handleMedicalLeaveChange('doctorContact', e.target.value)}
                      placeholder="+91-9876543210"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Hospital/Clinic Name</label>
                    <input
                      type="text"
                      value={medicalLeaveForm.doctorHospital}
                      onChange={(e) => handleMedicalLeaveChange('doctorHospital', e.target.value)}
                      placeholder="Enter hospital or clinic name"
                    />
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  Submit Application
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setMedicalLeaveForm({
                    fromDate: '',
                    toDate: '',
                    medicalReport: null,
                    fitnessCertificate: null,
                    doctorName: '',
                    doctorContact: '',
                    doctorHospital: ''
                  })}
                >
                  Reset Form
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Leave History Tab */}
        {activeTab === 'history' && (
          <div className="tab-content">
            <div className="history-header">
              <h2>Leave History</h2>
              <p>View your previous leave applications</p>
            </div>

            <div className="history-tabs">
              <button 
                className={`history-tab-btn ${historySubTab === 'duty' ? 'active' : ''}`}
                onClick={() => setHistorySubTab('duty')}
              >
                Duty Leaves ({dutyLeaves.length})
              </button>
              <button 
                className={`history-tab-btn ${historySubTab === 'medical' ? 'active' : ''}`}
                onClick={() => setHistorySubTab('medical')}
              >
                Medical Leaves ({medicalLeaves.length})
              </button>
            </div>

            {/* Duty Leave History */}
            {historySubTab === 'duty' && (
              <div className="leave-history">
                <h3>Duty Leave Applications</h3>
                {dutyLeaves.length > 0 ? (
                  <div className="leaves-grid">
                    {dutyLeaves.map(leave => (
                      <div key={leave.id} className="leave-card glass-card">
                        <div className="leave-header">
                          <h4>{leave.purpose}</h4>
                          <span 
                            className="status-badge"
                            style={{ backgroundColor: getStatusColor(leave.status) }}
                          >
                            {leave.status}
                          </span>
                        </div>
                        <div className="leave-details">
                          <div className="detail-item">
                            <strong>Type:</strong> {leave.type}
                          </div>
                          <div className="detail-item">
                            <strong>Category:</strong> {leave.category}
                          </div>
                          <div className="detail-item">
                            <strong>Applied:</strong> {formatDate(leave.appliedDate)}
                          </div>
                          {leave.approvedDate && (
                            <div className="detail-item">
                              <strong>Approved:</strong> {formatDate(leave.approvedDate)}
                            </div>
                          )}
                          <div className="detail-item">
                            <strong>Proof:</strong> {leave.proof}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">📭</div>
                    <h3>No Duty Leave Applications</h3>
                    <p>You haven't applied for any duty leaves yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* Medical Leave History */}
            {historySubTab === 'medical' && (
              <div className="leave-history">
                <h3>Medical Leave Applications</h3>
                {medicalLeaves.length > 0 ? (
                  <div className="leaves-grid">
                    {medicalLeaves.map(leave => (
                      <div key={leave.id} className="leave-card glass-card">
                        <div className="leave-header">
                          <h4>Medical Leave - {leave.duration}</h4>
                          <span 
                            className="status-badge"
                            style={{ backgroundColor: getStatusColor(leave.status) }}
                          >
                            {leave.status}
                          </span>
                        </div>
                        <div className="leave-details">
                          <div className="detail-item">
                            <strong>Period:</strong> {formatDate(leave.fromDate)} to {formatDate(leave.toDate)}
                          </div>
                          <div className="detail-item">
                            <strong>Duration:</strong> {leave.duration}
                          </div>
                          <div className="detail-item">
                            <strong>Doctor:</strong> {leave.doctorName}
                          </div>
                          <div className="detail-item">
                            <strong>Contact:</strong> {leave.doctorContact}
                          </div>
                          <div className="detail-item">
                            <strong>Applied:</strong> {formatDate(leave.appliedDate)}
                          </div>
                          {leave.approvedDate && (
                            <div className="detail-item">
                              <strong>Approved:</strong> {formatDate(leave.approvedDate)}
                            </div>
                          )}
                          <div className="detail-item">
                            <strong>Medical Report:</strong> {leave.medicalReport}
                          </div>
                          <div className="detail-item">
                            <strong>Fitness Certificate:</strong> {leave.fitnessCertificate}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">📭</div>
                    <h3>No Medical Leave Applications</h3>
                    <p>You haven't applied for any medical leaves yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;