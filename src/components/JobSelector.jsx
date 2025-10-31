import React, { useState, useEffect } from 'react';
import './JobSelector.css';

const JobSelector = ({ darkMode }) => {
  // Categorized skills based on your requirements
  const skillCategories = {
    CSE: {
      'Programming Languages': ['C', 'C++', 'Python', 'Java', 'JavaScript', 'Rust'],
      'Web Technologies': ['React', 'CSS', 'SQL'],
      'Core CS Concepts': ['DSA', 'OS', 'Computer Network', 'Computer Architecture', 'DBMS'],
      'Specializations': ['Cyber Security', 'Cloud Computing']
    },
    Commerce: {
      'Core Business': ['Accounting', 'Finance', 'Marketing', 'HR', 'Supply Chain Management'],
      'Economics': ['Micro Economics', 'Macro Economics'],
      'Analytics': ['Statistics', 'Business Analytics'],
      'Legal & Compliance': ['Taxation Principle']
    },
    Arts: {
      'Creative Skills': ['Visual Literacy', 'Concept Development', 'Artistic Identity'],
      'Professional Skills': ['Constructive Critique', 'Adaptability', 'Problem Solving']
    }
  };

  // Education levels
  const educationLevels = [
    'High School',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Doctorate',
    'Professional Certificate'
  ];

  // Comprehensive job database based on your provided jobs
  const jobDatabase = [
    {
      id: 1,
      title: 'UX/UI Designer',
      company: 'CreativeDesign Studio',
      description: 'Create intuitive user experiences and visually appealing interfaces for digital products.',
      requiredSkills: ['Visual Literacy', 'Concept Development', 'Adaptability'],
      interest: 'Design',
      minEducation: 'Bachelor\'s Degree',
      experienceLevel: 'Entry',
      salaryRange: '$60,000 - $90,000',
      category: 'Commerce + Arts',
      matchScore: 0
    },
    {
      id: 2,
      title: 'Software Development Engineer',
      company: 'TechCorp Inc.',
      description: 'Design and develop scalable software solutions using modern programming languages and computer science fundamentals.',
      requiredSkills: ['C++', 'Java', 'Python', 'DSA', 'OS'],
      interest: 'Technology',
      minEducation: 'Bachelor\'s Degree',
      experienceLevel: 'Mid',
      salaryRange: '$75,000 - $110,000',
      category: 'CSE',
      matchScore: 0
    },
    {
      id: 3,
      title: 'Marketing Manager',
      company: 'BrandGrowth Agency',
      description: 'Develop marketing strategies, manage campaigns, and build brand identity.',
      requiredSkills: ['Marketing', 'Visual Literacy', 'Concept Development'],
      interest: 'Marketing',
      minEducation: 'Bachelor\'s Degree',
      experienceLevel: 'Mid',
      salaryRange: '$70,000 - $110,000',
      category: 'Commerce + Arts',
      matchScore: 0
    },
    {
      id: 4,
      title: 'Financial Analyst',
      company: 'WealthManagement Group',
      description: 'Analyze financial data, prepare investment reports, and provide financial recommendations.',
      requiredSkills: ['Finance', 'Accounting', 'Statistics', 'Macro Economics'],
      interest: 'Finance',
      minEducation: 'Bachelor\'s Degree',
      experienceLevel: 'Entry',
      salaryRange: '$65,000 - $100,000',
      category: 'Commerce',
      matchScore: 0
    },
    {
      id: 5,
      title: 'Data Scientist',
      company: 'DataAnalytics Pro',
      description: 'Analyze complex datasets, build machine learning models, and derive business insights.',
      requiredSkills: ['Python', 'SQL', 'Statistics', 'Business Analytics', 'DSA'],
      interest: 'Science',
      minEducation: 'Master\'s Degree',
      experienceLevel: 'Mid',
      salaryRange: '$85,000 - $130,000',
      category: 'CSE + Commerce',
      matchScore: 0
    }
  ];

  // State management
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [educationLevel, setEducationLevel] = useState('');
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Commerce');
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulate loading progress
  useEffect(() => {
    let progress = 0;
    if (isLoading) {
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
        }
        setLoadingProgress(progress);
      }, 200);
      return () => clearInterval(interval);
    } else {
      setLoadingProgress(0);
    }
  }, [isLoading]);

  // Handle skill selection
  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(item => item !== skill)
        : [...prev, skill]
    );
  };

  // Calculate match score for a job
  const calculateMatchScore = (job) => {
    let score = 0;
    const maxScore = 100;

    // Skills match (70 points)
    const skillsMatch = job.requiredSkills.filter(skill => 
      selectedSkills.includes(skill)
    ).length;

    score += (skillsMatch / job.requiredSkills.length) * 70;

    // Education match (30 points)
    const educationLevelsOrder = educationLevels;
    const userEducationIndex = educationLevelsOrder.indexOf(educationLevel);
    const jobEducationIndex = educationLevelsOrder.indexOf(job.minEducation);
    
    if (userEducationIndex >= jobEducationIndex) {
      score += 30;
    } else if (userEducationIndex >= jobEducationIndex - 1) {
      score += 15;
    }

    return Math.min(Math.round(score), maxScore);
  };

  // Find recommended jobs
  const findRecommendedJobs = () => {
    setIsLoading(true);
    setHasSearched(true);

    setTimeout(() => {
      let scoredJobs = jobDatabase.map(job => ({
        ...job,
        matchScore: calculateMatchScore(job)
      }));

      // Filter jobs with minimum match threshold and sort by score
      let filteredJobs = scoredJobs
        .filter(job => job.matchScore >= 30)
        .sort((a, b) => b.matchScore - a.matchScore);

      // If no high matches, show top 5 by score
      if (filteredJobs.length === 0) {
        filteredJobs = scoredJobs
          .sort((a, b) => b.matchScore - a.matchScore)
          .slice(0, 5);
      }

      setRecommendedJobs(filteredJobs);
      setIsLoading(false);
    }, 1500);
  };

  // Get all jobs for a specific category
  const getJobsByCategory = (category) => {
    return jobDatabase.filter(job => job.category.includes(category));
  };

  // Get match color based on score
  const getMatchColor = (score) => {
    if (score >= 80) return '#27ae60';
    if (score >= 60) return '#f39c12';
    if (score >= 40) return '#e67e22';
    return '#e74c3c';
  };

  // Check if search can be performed
  const canSearch = selectedSkills.length > 0 || educationLevel;

  return (
    <div className={`job-selector-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="job-selector-header">
        <h1>EduProgress</h1>
        <p>Select your skills and education level to discover perfect career matches across CSE, Commerce, and Arts</p>
      </div>

      <div className="selector-layout">
        {/* Skills Selection Panel */}
        <div className="skills-panel">
          <h2>Select Your Skills</h2>
          
          {/* Category Tabs */}
          <div className="category-tabs">
            {Object.keys(skillCategories).map(category => (
              <button
                key={category}
                className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="skills-section">
            {Object.entries(skillCategories[activeCategory]).map(([subcategory, skills]) => (
              <div key={subcategory} className="skill-subcategory">
                <h4 className="subcategory-title">{subcategory}</h4>
                <div className="skills-grid">
                  {skills.map(skill => (
                    <div
                      key={skill}
                      className={`skill-item ${selectedSkills.includes(skill) ? 'selected' : ''}`}
                      onClick={() => handleSkillToggle(skill)}
                    >
                      <input
                        type="checkbox"
                        className="skill-checkbox"
                        checked={selectedSkills.includes(skill)}
                        onChange={() => {}}
                      />
                      <span className="skill-label">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Selected Skills */}
          <div className="selected-skills-section">
            <h3>Selected Skills ({selectedSkills.length})</h3>
            <div className="selected-skills-list">
              {selectedSkills.map(skill => (
                <div key={skill} className="selected-skill-tag">
                  {skill}
                  <span
                    className="remove-skill"
                    onClick={() => handleSkillToggle(skill)}
                  >
                    ×
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education and Results Panel */}
        <div className="results-panel">
          {/* Education Section */}
          <div className="education-section">
            <h3>Education Level</h3>
            <select
              className="education-select"
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
            >
              <option value="">Select your education level</option>
              {educationLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              className="find-jobs-btn primary"
              onClick={findRecommendedJobs}
              disabled={!canSearch || isLoading}
            >
              {isLoading ? (
                <>
                  <div className="button-spinner"></div>
                  Finding Matches...
                </>
              ) : (
                'Find Career Matches'
              )}
            </button>
            
            <button
              className="reset-btn secondary"
              onClick={() => {
                setSelectedSkills([]);
                setEducationLevel('');
                setRecommendedJobs([]);
                setHasSearched(false);
              }}
            >
              Reset All
            </button>
          </div>

          {/* Results Section */}
          {hasSearched && (
            <div className="results-section">
              {isLoading ? (
                <div className="loading-container">
                  <div className="modern-spinner">
                    <div className="spinner-circle">
                      <div className="spinner-inner"></div>
                    </div>
                    <div className="spinner-orbits">
                      <div className="orbit orbit-1"></div>
                      <div className="orbit orbit-2"></div>
                      <div className="orbit orbit-3"></div>
                    </div>
                  </div>
                  <div className="loading-content">
                    <h3>Finding Your Perfect Career Matches</h3>
                    <p>Analyzing your skills and education against our career database...</p>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${loadingProgress}%` }}
                      ></div>
                    </div>
                    <div className="loading-details">
                      <div className="loading-step active">
                        <span className="step-icon">🔍</span>
                        Scanning your profile
                      </div>
                      <div className={`loading-step ${loadingProgress > 33 ? 'active' : ''}`}>
                        <span className="step-icon">📊</span>
                        Calculating matches
                      </div>
                      <div className={`loading-step ${loadingProgress > 66 ? 'active' : ''}`}>
                        <span className="step-icon">🎯</span>
                        Preparing recommendations
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <h3>
                    {recommendedJobs.length > 0 
                      ? `Found ${recommendedJobs.length} Career Matches` 
                      : 'No Perfect Matches Found'
                    }
                  </h3>
                  
                  {recommendedJobs.length > 0 ? (
                    <div className="jobs-grid">
                      {recommendedJobs.map(job => (
                        <div key={job.id} className="job-card">
                          <div className="job-header">
                            <div className="job-title-company">
                              <div className="job-title">{job.title}</div>
                              <div className="job-company">{job.company}</div>
                            </div>
                            <div 
                              className="match-badge"
                              style={{ backgroundColor: getMatchColor(job.matchScore) }}
                            >
                              {job.matchScore}% Match
                            </div>
                          </div>
                          
                          <div className="job-category">{job.category}</div>
                          
                          <div className="job-description">{job.description}</div>
                          
                          <div className="job-meta">
                            <div className="meta-item">
                              <strong>Education:</strong> {job.minEducation}
                            </div>
                            <div className="meta-item">
                              <strong>Salary:</strong> {job.salaryRange}
                            </div>
                            <div className="meta-item">
                              <strong>Level:</strong> {job.experienceLevel}
                            </div>
                          </div>
                          
                          <div className="required-skills">
                            <strong>Required Skills:</strong>
                            <div className="skills-tags">
                              {job.requiredSkills.map(skill => (
                                <span 
                                  key={skill} 
                                  className={`skill-tag ${selectedSkills.includes(skill) ? 'matched' : ''}`}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-results">
                      <h4>No strong matches found with your current skills</h4>
                      <p>Try these suggestions:</p>
                      <ul>
                        <li>Add more skills from different categories</li>
                        <li>Consider lower education requirements</li>
                        <li>Explore related fields by selecting different skill categories</li>
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Category Preview */}
          {!hasSearched && (
            <div className="category-preview">
              <h3>Explore Career Categories</h3>
              <div className="category-cards">
                <div className="category-card" onClick={() => setActiveCategory('CSE')}>
                  <h4>Technology & Engineering</h4>
                  <p>{getJobsByCategory('CSE').length} careers</p>
                  <span>Software, DevOps, Security, Data</span>
                </div>
                <div className="category-card" onClick={() => setActiveCategory('Commerce')}>
                  <h4>Business & Commerce</h4>
                  <p>{getJobsByCategory('Commerce').length} careers</p>
                  <span>Finance, Marketing, Management, Analytics</span>
                </div>
                <div className="category-card" onClick={() => setActiveCategory('Arts')}>
                  <h4>Creative & Arts</h4>
                  <p>{getJobsByCategory('Arts').length} careers</p>
                  <span>Design, UX/UI, Creative Management</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSelector;