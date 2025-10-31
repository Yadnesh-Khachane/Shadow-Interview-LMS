import React, { useState, useEffect } from 'react';
import './Placement.css';

const Placement = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [jobs, setJobs] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [userProfile, setUserProfile] = useState({
    name: 'Student User',
    title: 'Computer Science Student',
    college: 'Your College',
    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
    resume: null
  });

  // Mock data - in real implementation, this would come from APIs
  useEffect(() => {
    // Mock job data
    const mockJobs = [
      {
        id: 1,
        company: 'Google',
        logo: '🏢',
        title: 'Software Engineer Intern',
        location: 'Mountain View, CA',
        type: 'Internship',
        salary: '$7,500/month',
        description: 'Join Google as a Software Engineer Intern and work on cutting-edge projects.',
        requirements: ['JavaScript', 'Python', 'Data Structures'],
        postedDate: '2024-01-20',
        applicants: 234,
        deadline: '2024-02-15'
      },
      {
        id: 2,
        company: 'Microsoft',
        logo: '🏢',
        title: 'Frontend Developer',
        location: 'Redmond, WA',
        type: 'Full-time',
        salary: '$120,000/year',
        description: 'Build amazing user experiences with React and modern web technologies.',
        requirements: ['React', 'TypeScript', 'CSS', 'UI/UX'],
        postedDate: '2024-01-18',
        applicants: 189,
        deadline: '2024-02-28'
      },
      {
        id: 3,
        company: 'Amazon',
        logo: '🏢',
        title: 'Backend Engineer',
        location: 'Seattle, WA',
        type: 'Full-time',
        salary: '$130,000/year',
        description: 'Develop scalable backend systems using AWS and microservices architecture.',
        requirements: ['Node.js', 'AWS', 'Docker', 'Database Design'],
        postedDate: '2024-01-15',
        applicants: 156,
        deadline: '2024-03-01'
      },
      {
        id: 4,
        company: 'Meta',
        logo: '🏢',
        title: 'Machine Learning Intern',
        location: 'Menlo Park, CA',
        type: 'Internship',
        salary: '$8,000/month',
        description: 'Work on AI/ML projects and research at Meta.',
        requirements: ['Python', 'TensorFlow', 'Machine Learning', 'Statistics'],
        postedDate: '2024-01-12',
        applicants: 278,
        deadline: '2024-02-20'
      }
    ];

    // Mock student profiles
    const mockProfiles = [
      {
        id: 1,
        name: 'Alice Johnson',
        title: 'Final Year CS Student',
        college: 'Tech University',
        skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
        achievements: ['Won Hackathon 2023', 'Google Summer of Code'],
        connections: 45,
        resume: true
      },
      {
        id: 2,
        name: 'Bob Smith',
        title: 'Computer Engineering Student',
        college: 'Engineering College',
        skills: ['Python', 'Machine Learning', 'Data Analysis', 'SQL'],
        achievements: ['Published Research Paper', 'ML Competition Winner'],
        connections: 32,
        resume: true
      },
      {
        id: 3,
        name: 'Carol Davis',
        title: 'Full Stack Developer',
        college: 'State University',
        skills: ['JavaScript', 'React', 'Express', 'PostgreSQL'],
        achievements: ['Built E-commerce Platform', 'Open Source Contributor'],
        connections: 28,
        resume: true
      }
    ];

    // Mock community posts
    const mockPosts = [
      {
        id: 1,
        user: 'Alice Johnson',
        title: 'Just got an internship at Google! 🎉',
        content: 'Excited to share that I\'ll be joining Google as a Software Engineer Intern this summer. The interview process was challenging but rewarding. Happy to help anyone preparing for tech interviews!',
        likes: 45,
        comments: 12,
        shares: 3,
        timestamp: '2024-01-20T10:30:00',
        type: 'achievement'
      },
      {
        id: 2,
        user: 'Career Services',
        title: 'Upcoming Placement Drive',
        content: 'Microsoft will be conducting campus placements on February 15th. Register on the portal and update your profiles. Preparation materials available in resources section.',
        likes: 23,
        comments: 8,
        shares: 5,
        timestamp: '2024-01-19T14:20:00',
        type: 'announcement'
      },
      {
        id: 3,
        user: 'Bob Smith',
        title: 'Looking for study partners for coding interviews',
        content: 'Anyone interested in forming a study group for FAANG company interviews? We can practice DS&A problems together and do mock interviews.',
        likes: 18,
        comments: 7,
        shares: 1,
        timestamp: '2024-01-18T16:45:00',
        type: 'collaboration'
      }
    ];

    setJobs(mockJobs);
    setProfiles(mockProfiles);
    setPosts(mockPosts);
  }, []);

  const handleApplyJob = (jobId) => {
    alert(`Applied to job #${jobId}. Make sure your resume is updated!`);
    // In real implementation, this would call an API
  };

  const handleConnect = (profileId) => {
    alert(`Connection request sent to profile #${profileId}`);
    // In real implementation, this would call an API
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      const newPostObj = {
        id: posts.length + 1,
        user: userProfile.name,
        title: 'New Post',
        content: newPost,
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: new Date().toISOString(),
        type: 'post'
      };
      setPosts([newPostObj, ...posts]);
      setNewPost('');
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
      setUserProfile(prev => ({
        ...prev,
        resume: file.name
      }));
      alert('Resume uploaded successfully!');
    } else {
      alert('Please upload a PDF file.');
    }
  };

  const handleLikePost = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="placement-container">
      <div className="placement-header fade-in">
        <h1>Career Hub 🚀</h1>
        <p>Connect, Learn, and Grow with Placement Opportunities</p>
      </div>

      <div className="placement-content">
        {/* Main Layout */}
        <div className="placement-layout">
          {/* Left Sidebar - User Profile */}
          <div className="left-sidebar">
            <div className="profile-card glass-card">
              <div className="profile-header">
                <div className="profile-avatar">
                  <span className="avatar-icon">👤</span>
                </div>
                <div className="profile-info">
                  <h3>{userProfile.name}</h3>
                  <p>{userProfile.title}</p>
                  <p className="college">{userProfile.college}</p>
                </div>
              </div>
              
              <div className="profile-stats">
                <div className="stat">
                  <strong>23</strong>
                  <span>Connections</span>
                </div>
                <div className="stat">
                  <strong>5</strong>
                  <span>Applications</span>
                </div>
              </div>

              <div className="profile-skills">
                <h4>Skills</h4>
                <div className="skills-list">
                  {userProfile.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="resume-section">
                <h4>Resume</h4>
                {userProfile.resume ? (
                  <div className="resume-uploaded">
                    <span>📄 {userProfile.resume}</span>
                    <button className="btn-secondary small">Update</button>
                  </div>
                ) : (
                  <div className="resume-upload">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleResumeUpload}
                      id="resume-upload"
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="resume-upload" className="upload-btn">
                      📄 Upload Resume (PDF)
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="stats-card glass-card">
              <h3>Placement Stats</h3>
              <div className="placement-stats">
                <div className="placement-stat">
                  <span className="stat-icon">💼</span>
                  <div className="stat-details">
                    <strong>{jobs.length}</strong>
                    <span>Active Jobs</span>
                  </div>
                </div>
                <div className="placement-stat">
                  <span className="stat-icon">👥</span>
                  <div className="stat-details">
                    <strong>{profiles.length}+</strong>
                    <span>Students</span>
                  </div>
                </div>
                <div className="placement-stat">
                  <span className="stat-icon">🏆</span>
                  <div className="stat-details">
                    <strong>85%</strong>
                    <span>Placement Rate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="main-content">
            {/* Navigation Tabs */}
            <div className="tabs-navigation glass-card">
              <button 
                className={`tab-btn ${activeTab === 'jobs' ? 'active' : ''}`}
                onClick={() => setActiveTab('jobs')}
              >
                💼 Jobs
              </button>
              <button 
                className={`tab-btn ${activeTab === 'community' ? 'active' : ''}`}
                onClick={() => setActiveTab('community')}
              >
                💬 Community
              </button>
              <button 
                className={`tab-btn ${activeTab === 'network' ? 'active' : ''}`}
                onClick={() => setActiveTab('network')}
              >
                👥 Network
              </button>
              <button 
                className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
                onClick={() => setActiveTab('resources')}
              >
                📚 Resources
              </button>
            </div>

            {/* Jobs Tab */}
            {activeTab === 'jobs' && (
              <div className="tab-content">
                <div className="jobs-header">
                  <h2>Job Opportunities</h2>
                  <p>Find your dream job from top companies</p>
                </div>
                
                <div className="jobs-grid">
                  {jobs.map(job => (
                    <div key={job.id} className="job-card glass-card">
                      <div className="job-header">
                        <div className="company-info">
                          <span className="company-logo">{job.logo}</span>
                          <div className="company-details">
                            <h3>{job.company}</h3>
                            <span className="job-type">{job.type}</span>
                          </div>
                        </div>
                        <div className="job-meta">
                          <span className="salary">{job.salary}</span>
                          <span className="applicants">{job.applicants} applicants</span>
                        </div>
                      </div>

                      <div className="job-body">
                        <h4 className="job-title">{job.title}</h4>
                        <p className="job-location">📍 {job.location}</p>
                        <p className="job-description">{job.description}</p>
                        
                        <div className="job-requirements">
                          <h5>Requirements:</h5>
                          <div className="requirements-list">
                            {job.requirements.map((req, index) => (
                              <span key={index} className="requirement-tag">{req}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="job-footer">
                        <div className="job-dates">
                          <span>Posted: {formatDate(job.postedDate)}</span>
                          <span className="deadline">Deadline: {formatDate(job.deadline)}</span>
                        </div>
                        <button 
                          className="btn-primary apply-btn"
                          onClick={() => handleApplyJob(job.id)}
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Community Tab */}
            {activeTab === 'community' && (
              <div className="tab-content">
                <div className="community-header">
                  <h2>Community Feed</h2>
                  <p>Share achievements, ask questions, and connect</p>
                </div>

                {/* Create Post */}
                <div className="create-post-card glass-card">
                  <form onSubmit={handlePostSubmit}>
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="Share your achievement, ask a question, or start a discussion..."
                      rows="3"
                    />
                    <div className="post-actions">
                      <button type="submit" className="btn-primary" disabled={!newPost.trim()}>
                        Post
                      </button>
                    </div>
                  </form>
                </div>

                {/* Posts Feed */}
                <div className="posts-feed">
                  {posts.map(post => (
                    <div key={post.id} className="post-card glass-card">
                      <div className="post-header">
                        <div className="post-user">
                          <span className="user-avatar">👤</span>
                          <div className="user-info">
                            <strong>{post.user}</strong>
                            <span>{formatDate(post.timestamp)} at {formatTime(post.timestamp)}</span>
                          </div>
                        </div>
                        <span className={`post-type ${post.type}`}>
                          {post.type === 'achievement' ? '🏆' : 
                           post.type === 'announcement' ? '📢' : '🤝'}
                        </span>
                      </div>

                      <div className="post-content">
                        <h4>{post.title}</h4>
                        <p>{post.content}</p>
                      </div>

                      <div className="post-actions">
                        <button 
                          className="action-btn"
                          onClick={() => handleLikePost(post.id)}
                        >
                          👍 Like ({post.likes})
                        </button>
                        <button className="action-btn">
                          💬 Comment ({post.comments})
                        </button>
                        <button className="action-btn">
                          🔗 Share ({post.shares})
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Network Tab */}
            {activeTab === 'network' && (
              <div className="tab-content">
                <div className="network-header">
                  <h2>Student Network</h2>
                  <p>Connect with fellow students and alumni</p>
                </div>

                <div className="profiles-grid">
                  {profiles.map(profile => (
                    <div key={profile.id} className="profile-card-small glass-card">
                      <div className="profile-header-small">
                        <span className="avatar-icon">👤</span>
                        <div className="profile-info-small">
                          <h4>{profile.name}</h4>
                          <p>{profile.title}</p>
                          <p className="college-small">{profile.college}</p>
                        </div>
                      </div>

                      <div className="profile-skills-small">
                        {profile.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="skill-tag-small">{skill}</span>
                        ))}
                      </div>

                      {profile.achievements && (
                        <div className="achievements">
                          <strong>Achievements:</strong>
                          <ul>
                            {profile.achievements.map((achievement, index) => (
                              <li key={index}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="profile-actions">
                        <button 
                          className="btn-primary small"
                          onClick={() => handleConnect(profile.id)}
                        >
                          Connect
                        </button>
                        <button className="btn-secondary small">
                          View Profile
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div className="tab-content">
                <div className="resources-header">
                  <h2>Career Resources</h2>
                  <p>Materials to help you succeed in your career journey</p>
                </div>

                <div className="resources-grid">
                  <div className="resource-card glass-card">
                    <span className="resource-icon">📝</span>
                    <h3>Resume Templates</h3>
                    <p>Professional resume templates for tech roles</p>
                    <button className="btn-primary">Download</button>
                  </div>

                  <div className="resource-card glass-card">
                    <span className="resource-icon">💡</span>
                    <h3>Interview Prep</h3>
                    <p>Common interview questions and tips</p>
                    <button className="btn-primary">Access</button>
                  </div>

                  <div className="resource-card glass-card">
                    <span className="resource-icon">📊</span>
                    <h3>Company Research</h3>
                    <p>Information about top tech companies</p>
                    <button className="btn-primary">Explore</button>
                  </div>

                  <div className="resource-card glass-card">
                    <span className="resource-icon">🎯</span>
                    <h3>Career Guidance</h3>
                    <p>Path planning and skill development</p>
                    <button className="btn-primary">Learn More</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placement;