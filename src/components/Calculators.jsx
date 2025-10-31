import React, { useState } from 'react';
import './Calculators.css';

const Calculators = () => {
  const [activeCalculator, setActiveCalculator] = useState(null);

  const calculators = [
    {
      id: 1,
      name: "Percentage Calculator",
      icon: "📊",
      description: "Calculate percentages and marks",
      color: "#2c5aa0"
    },
    {
      id: 2,
      name: "CGPA Calculator",
      icon: "🎓",
      description: "Calculate CGPA and GPA",
      color: "#28a745"
    },
    {
      id: 3,
      name: "Attendance Calculator",
      icon: "📅",
      description: "Track attendance percentage",
      color: "#fd7e14"
    },
    {
      id: 4,
      name: "Grade Calculator",
      icon: "⭐",
      description: "Calculate final grades",
      color: "#6f42c1"
    },
    {
      id: 5,
      name: "SGPA Calculator",
      icon: "📈",
      description: "Calculate semester GPA",
      color: "#e83e8c"
    },
    {
      id: 6,
      name: "Final Score Calculator",
      icon: "🎯",
      description: "Calculate final exam scores",
      color: "#20c997"
    }
  ];

  const CalculatorCard = ({ calculator }) => (
    <div 
      className="calculator-card glass-card fade-in"
      style={{ '--calculator-color': calculator.color }}
      onClick={() => setActiveCalculator(calculator.id)}
    >
      <div className="calculator-icon">{calculator.icon}</div>
      <h3>{calculator.name}</h3>
      <p>{calculator.description}</p>
      <div className="calculator-open-btn">
        Open Calculator
      </div>
    </div>
  );

  // Percentage Calculator Component
  const PercentageCalculator = () => {
    const [obtained, setObtained] = useState('');
    const [total, setTotal] = useState('');
    const [percentage, setPercentage] = useState(null);

    const calculatePercentage = () => {
      if (obtained && total) {
        const result = (parseFloat(obtained) / parseFloat(total)) * 100;
        setPercentage(result.toFixed(2));
      }
    };

    const resetCalculator = () => {
      setObtained('');
      setTotal('');
      setPercentage(null);
    };

    return (
      <div className="calculator-modal">
        <div className="calculator-content glass-card">
          <div className="calculator-header">
            <h2>Percentage Calculator</h2>
            <button className="close-btn" onClick={() => setActiveCalculator(null)}>✕</button>
          </div>
          <div className="calculator-body">
            <div className="input-group">
              <label>Marks Obtained:</label>
              <input
                type="number"
                value={obtained}
                onChange={(e) => setObtained(e.target.value)}
                placeholder="Enter obtained marks"
              />
            </div>
            <div className="input-group">
              <label>Total Marks:</label>
              <input
                type="number"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                placeholder="Enter total marks"
              />
            </div>
            <div className="calculator-actions">
              <button className="btn-primary" onClick={calculatePercentage}>
                Calculate
              </button>
              <button className="btn-secondary" onClick={resetCalculator}>
                Reset
              </button>
            </div>
            {percentage !== null && (
              <div className="calculator-result">
                <h3>Result:</h3>
                <div className="result-value">{percentage}%</div>
                <div className="result-description">
                  You scored {percentage}% of the total marks.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // CGPA Calculator Component
  const CGPACalculator = () => {
    const [subjects, setSubjects] = useState([{ grade: '', credits: '' }]);
    const [cgpa, setCgpa] = useState(null);

    const addSubject = () => {
      setSubjects([...subjects, { grade: '', credits: '' }]);
    };

    const removeSubject = (index) => {
      if (subjects.length > 1) {
        const newSubjects = subjects.filter((_, i) => i !== index);
        setSubjects(newSubjects);
      }
    };

    const updateSubject = (index, field, value) => {
      const newSubjects = subjects.map((subject, i) => 
        i === index ? { ...subject, [field]: value } : subject
      );
      setSubjects(newSubjects);
    };

    const calculateCGPA = () => {
      let totalCredits = 0;
      let totalPoints = 0;
      let valid = true;

      subjects.forEach(subject => {
        if (!subject.grade || !subject.credits) {
          valid = false;
          return;
        }
        const gradePoint = parseFloat(subject.grade);
        const credits = parseFloat(subject.credits);
        totalPoints += gradePoint * credits;
        totalCredits += credits;
      });

      if (valid && totalCredits > 0) {
        const result = totalPoints / totalCredits;
        setCgpa(result.toFixed(2));
      }
    };

    const resetCalculator = () => {
      setSubjects([{ grade: '', credits: '' }]);
      setCgpa(null);
    };

    return (
      <div className="calculator-modal">
        <div className="calculator-content glass-card">
          <div className="calculator-header">
            <h2>CGPA Calculator</h2>
            <button className="close-btn" onClick={() => setActiveCalculator(null)}>✕</button>
          </div>
          <div className="calculator-body">
            <div className="subjects-list">
              {subjects.map((subject, index) => (
                <div key={index} className="subject-input-group">
                  <div className="subject-header">
                    <h4>Subject {index + 1}</h4>
                    {subjects.length > 1 && (
                      <button 
                        className="remove-btn"
                        onClick={() => removeSubject(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="input-row">
                    <div className="input-group">
                      <label>Grade Points:</label>
                      <input
                        type="number"
                        step="0.1"
                        value={subject.grade}
                        onChange={(e) => updateSubject(index, 'grade', e.target.value)}
                        placeholder="e.g., 9.5"
                        min="0"
                        max="10"
                      />
                    </div>
                    <div className="input-group">
                      <label>Credits:</label>
                      <input
                        type="number"
                        value={subject.credits}
                        onChange={(e) => updateSubject(index, 'credits', e.target.value)}
                        placeholder="e.g., 4"
                        min="1"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-secondary add-subject-btn" onClick={addSubject}>
              + Add Subject
            </button>
            <div className="calculator-actions">
              <button className="btn-primary" onClick={calculateCGPA}>
                Calculate CGPA
              </button>
              <button className="btn-secondary" onClick={resetCalculator}>
                Reset
              </button>
            </div>
            {cgpa !== null && (
              <div className="calculator-result">
                <h3>Your CGPA:</h3>
                <div className="result-value">{cgpa}</div>
                <div className="result-description">
                  Based on {subjects.length} subject(s)
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Attendance Calculator Component
  const AttendanceCalculator = () => {
    const [classesAttended, setClassesAttended] = useState('');
    const [totalClasses, setTotalClasses] = useState('');
    const [attendance, setAttendance] = useState(null);
    const [required, setRequired] = useState('75');

    const calculateAttendance = () => {
      if (classesAttended && totalClasses) {
        const attended = parseFloat(classesAttended);
        const total = parseFloat(totalClasses);
        const percentage = (attended / total) * 100;
        setAttendance(percentage.toFixed(2));
      }
    };

    const getAttendanceStatus = () => {
      if (attendance === null) return '';
      const requiredPercent = parseFloat(required);
      if (attendance >= requiredPercent) {
        return { status: 'Good', color: '#28a745' };
      } else {
        const needed = Math.ceil((requiredPercent / 100) * totalClasses - classesAttended);
        return { 
          status: `Need ${needed > 0 ? needed : 0} more classes`, 
          color: '#dc3545' 
        };
      }
    };

    const resetCalculator = () => {
      setClassesAttended('');
      setTotalClasses('');
      setAttendance(null);
    };

    const status = getAttendanceStatus();

    return (
      <div className="calculator-modal">
        <div className="calculator-content glass-card">
          <div className="calculator-header">
            <h2>Attendance Calculator</h2>
            <button className="close-btn" onClick={() => setActiveCalculator(null)}>✕</button>
          </div>
          <div className="calculator-body">
            <div className="input-group">
              <label>Classes Attended:</label>
              <input
                type="number"
                value={classesAttended}
                onChange={(e) => setClassesAttended(e.target.value)}
                placeholder="Number of classes attended"
              />
            </div>
            <div className="input-group">
              <label>Total Classes:</label>
              <input
                type="number"
                value={totalClasses}
                onChange={(e) => setTotalClasses(e.target.value)}
                placeholder="Total number of classes"
              />
            </div>
            <div className="input-group">
              <label>Required Attendance (%):</label>
              <input
                type="number"
                value={required}
                onChange={(e) => setRequired(e.target.value)}
                placeholder="Required percentage"
                min="0"
                max="100"
              />
            </div>
            <div className="calculator-actions">
              <button className="btn-primary" onClick={calculateAttendance}>
                Calculate
              </button>
              <button className="btn-secondary" onClick={resetCalculator}>
                Reset
              </button>
            </div>
            {attendance !== null && (
              <div className="calculator-result">
                <h3>Attendance Percentage:</h3>
                <div className="result-value">{attendance}%</div>
                <div 
                  className="attendance-status"
                  style={{ color: status.color }}
                >
                  {status.status}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Grade Calculator Component
  const GradeCalculator = () => {
    const [scores, setScores] = useState({
      assignment: '',
      midterm: '',
      final: '',
      participation: ''
    });
    const [weights, setWeights] = useState({
      assignment: 30,
      midterm: 30,
      final: 35,
      participation: 5
    });
    const [finalGrade, setFinalGrade] = useState(null);

    const calculateFinalGrade = () => {
      let total = 0;
      let valid = true;

      Object.keys(scores).forEach(key => {
        if (scores[key] && weights[key]) {
          total += (parseFloat(scores[key]) * parseFloat(weights[key])) / 100;
        } else if (scores[key] && !weights[key]) {
          valid = false;
        }
      });

      if (valid && total > 0) {
        setFinalGrade(total.toFixed(2));
      }
    };

    const resetCalculator = () => {
      setScores({
        assignment: '',
        midterm: '',
        final: '',
        participation: ''
      });
      setFinalGrade(null);
    };

    const getGradeLetter = (score) => {
      if (score >= 90) return 'A';
      if (score >= 80) return 'B';
      if (score >= 70) return 'C';
      if (score >= 60) return 'D';
      return 'F';
    };

    return (
      <div className="calculator-modal">
        <div className="calculator-content glass-card">
          <div className="calculator-header">
            <h2>Grade Calculator</h2>
            <button className="close-btn" onClick={() => setActiveCalculator(null)}>✕</button>
          </div>
          <div className="calculator-body">
            {Object.keys(scores).map((component) => (
              <div key={component} className="input-row">
                <div className="input-group">
                  <label>{component.charAt(0).toUpperCase() + component.slice(1)} Score:</label>
                  <input
                    type="number"
                    value={scores[component]}
                    onChange={(e) => setScores({...scores, [component]: e.target.value})}
                    placeholder="Score"
                    min="0"
                    max="100"
                  />
                </div>
                <div className="input-group">
                  <label>Weight (%):</label>
                  <input
                    type="number"
                    value={weights[component]}
                    onChange={(e) => setWeights({...weights, [component]: e.target.value})}
                    placeholder="Weight"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            ))}
            <div className="calculator-actions">
              <button className="btn-primary" onClick={calculateFinalGrade}>
                Calculate Final Grade
              </button>
              <button className="btn-secondary" onClick={resetCalculator}>
                Reset
              </button>
            </div>
            {finalGrade !== null && (
              <div className="calculator-result">
                <h3>Final Grade:</h3>
                <div className="result-value">{finalGrade}%</div>
                <div className="grade-letter">
                  Grade: {getGradeLetter(finalGrade)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render active calculator
  const renderActiveCalculator = () => {
    switch (activeCalculator) {
      case 1: return <PercentageCalculator />;
      case 2: return <CGPACalculator />;
      case 3: return <AttendanceCalculator />;
      case 4: return <GradeCalculator />;
      // Add more calculators as needed
      default: return null;
    }
  };

  return (
    <div className="calculators-container">
      <div className="calculators-header fade-in">
        <h1>Student Calculators 🧮</h1>
        <p>Use these tools to calculate your academic performance</p>
      </div>

      <div className="calculators-grid">
        {calculators.map(calculator => (
          <CalculatorCard key={calculator.id} calculator={calculator} />
        ))}
      </div>

      {activeCalculator && renderActiveCalculator()}
    </div>
  );
};

export default Calculators;