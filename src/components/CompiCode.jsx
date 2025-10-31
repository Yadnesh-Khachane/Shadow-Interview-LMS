import React, { useState } from 'react';
import './CompiCode.css';

const CompiCode = () => {
  const [hackerrankData, setHackerrankData] = useState(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock data for HackerRank - in a real app, you'd use actual API calls
  const mockHackerrankData = {
    username: '',
    name: '',
    level: '',
    badges: [],
    certificates: [],
    contest_rating: 0,
    problems_solved: 0,
    recent_submissions: [],
    skill_stats: {},
    profile_picture: ''
  };

  // Simulate fetching HackerRank data
  const fetchHackerrankData = async (username) => {
    setLoading(true);
    setError('');
    setHackerrankData(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock response data based on username
      const mockData = {
        username: username,
        name: username === 'demo' ? 'Demo User' : `${username.charAt(0).toUpperCase() + username.slice(1)} User`,
        level: getRandomLevel(),
        badges: generateBadges(username),
        certificates: generateCertificates(username),
        contest_rating: Math.floor(Math.random() * 2000) + 1000,
        problems_solved: Math.floor(Math.random() * 500) + 50,
        recent_submissions: generateRecentSubmissions(),
        skill_stats: generateSkillStats(),
        profile_picture: `https://avatars.dicebear.com/api/identicon/${username}.svg`
      };

      setHackerrankData(mockData);
    } catch (err) {
      setError('Failed to fetch HackerRank data. Please try again.');
      console.error('Error fetching HackerRank data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions for mock data generation
  const getRandomLevel = () => {
    const levels = ['Beginner', 'Intermediate', 'Expert', 'Master'];
    return levels[Math.floor(Math.random() * levels.length)];
  };

  const generateBadges = (username) => {
    const allBadges = [
      'Problem Solving', 'Python', '30 Days of Code', 'SQL', 'C++', 'Java',
      'Algorithms', 'Data Structures', '10 Days of JavaScript', 'Linux Shell',
      'Artificial Intelligence', 'Regex', 'Database', 'Mathematics', 'Functional Programming'
    ];
    
    const badgeCount = Math.floor(Math.random() * 8) + 3;
    return allBadges
      .sort(() => 0.5 - Math.random())
      .slice(0, badgeCount)
      .map(badge => ({
        name: badge,
        earned_date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        stars: Math.floor(Math.random() * 3) + 1
      }));
  };

  const generateCertificates = (username) => {
    const certificates = [
      'Problem Solving (Basic)', 'Python (Basic)', 'SQL (Basic)', 'Java (Basic)',
      'JavaScript (Intermediate)', 'Data Structures (Advanced)', 'Algorithms (Advanced)'
    ];
    
    const certCount = Math.floor(Math.random() * 4) + 1;
    return certificates
      .sort(() => 0.5 - Math.random())
      .slice(0, certCount)
      .map(cert => ({
        name: cert,
        date: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        score: Math.floor(Math.random() * 30) + 70
      }));
  };

  const generateRecentSubmissions = () => {
    const problems = [
      'Array Manipulation', 'Dynamic Programming', 'Graph Theory', 'String Manipulation',
      'Sorting', 'Searching', 'Bit Manipulation', 'Recursion', 'Greedy Algorithms',
      'Tree Traversal', 'Linked Lists', 'Stacks and Queues'
    ];
    
    const difficulties = ['Easy', 'Medium', 'Hard'];
    const statuses = ['Accepted', 'Accepted', 'Accepted', 'Accepted', 'Failed']; // Mostly accepted
    
    return Array.from({ length: 8 }, (_, i) => ({
      problem: problems[Math.floor(Math.random() * problems.length)],
      difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: `${Math.floor(Math.random() * 2000) + 100}ms`
    }));
  };

  const generateSkillStats = () => {
    const skills = ['Python', 'Java', 'C++', 'JavaScript', 'SQL', 'Algorithms', 'Data Structures'];
    return skills.reduce((stats, skill) => {
      stats[skill] = Math.floor(Math.random() * 100);
      return stats;
    }, {});
  };

  // Process activity data for the chart
  const processActivityData = () => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toISOString().split('T')[0];
    });

    // Generate mock activity data
    return last30Days.map(date => ({
      date,
      count: Math.floor(Math.random() * 5) // 0-4 submissions per day
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      fetchHackerrankData(username.trim());
    } else {
      setError('Please enter a HackerRank username');
    }
  };

  // Format number with commas
  const formatNumber = (num) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '0';
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Easy': '#28a745',
      'Medium': '#ffc107',
      'Hard': '#dc3545'
    };
    return colors[difficulty] || '#6c757d';
  };

  // Get badge color based on stars
  const getBadgeColor = (stars) => {
    const colors = {
      1: '#6c757d',
      2: '#28a745', 
      3: '#007bff',
      4: '#6f42c1'
    };
    return colors[stars] || '#6c757d';
  };

  const activityData = processActivityData();

  return (
    <div className="compi-code-container">
      <div className="compi-code-header fade-in">
        <h1>HackerRank Progress Tracker</h1>
        <p>Connect your HackerRank profile to track your coding progress and achievements</p>
      </div>

      <div className="compi-code-content">
        {/* HackerRank Username Input */}
        <div className="search-section glass-card">
          <form onSubmit={handleSubmit} className="hackerrank-search">
            <input
              type="text"
              placeholder="Enter your HackerRank username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Fetching...' : 'Fetch Data'}
            </button>
          </form>
          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}
        </div>

        {loading && (
          <div className="loading glass-card">
            <div className="loading-spinner"></div>
            <p>Fetching HackerRank data...</p>
          </div>
        )}

        {hackerrankData && !loading && (
          <>
            {/* User Profile */}
            <div className="profile-section glass-card fade-in">
              <div className="profile-header">
                <img 
                  src={hackerrankData.profile_picture} 
                  alt={hackerrankData.username}
                  className="profile-avatar"
                />
                <div className="profile-info">
                  <h2>{hackerrankData.name}</h2>
                  <p>@{hackerrankData.username}</p>
                  <div className="profile-level">
                    <span className={`level-badge level-${hackerrankData.level.toLowerCase()}`}>
                      {hackerrankData.level}
                    </span>
                  </div>
                  <div className="profile-stats">
                    <div className="stat">
                      <strong>{formatNumber(hackerrankData.contest_rating)}</strong>
                      <span>Contest Rating</span>
                    </div>
                    <div className="stat">
                      <strong>{formatNumber(hackerrankData.problems_solved)}</strong>
                      <span>Problems Solved</span>
                    </div>
                    <div className="stat">
                      <strong>{hackerrankData.badges.length}</strong>
                      <span>Badges</span>
                    </div>
                    <div className="stat">
                      <strong>{hackerrankData.certificates.length}</strong>
                      <span>Certificates</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Chart */}
            <div className="activity-section glass-card fade-in">
              <h3>Recent Activity (Last 30 Days)</h3>
              <div className="activity-chart">
                {activityData.map((day, index) => (
                  <div key={index} className="activity-day">
                    <div 
                      className="activity-bar"
                      style={{ 
                        height: `${Math.min((day.count / 4) * 100, 100)}%`,
                        opacity: day.count > 0 ? 0.3 + (day.count / 4) * 0.7 : 0.1,
                        backgroundColor: day.count > 0 ? '#1ba94c' : '#e9ecef'
                      }}
                      title={`${day.count} submissions on ${new Date(day.date).toLocaleDateString()}`}
                    ></div>
                    <span className="activity-label">
                      {new Date(day.date).toLocaleDateString('en', { day: 'numeric' })}
                    </span>
                  </div>
                ))}
              </div>
              <div className="activity-stats">
                <div className="activity-stat">
                  <strong>
                    {activityData.reduce((sum, day) => sum + day.count, 0)}
                  </strong>
                  <span>Total submissions (30 days)</span>
                </div>
                <div className="activity-stat">
                  <strong>
                    {activityData.filter(day => day.count > 0).length}
                  </strong>
                  <span>Active days</span>
                </div>
              </div>
            </div>

            {/* Badges Section */}
            <div className="badges-section glass-card fade-in">
              <h3>Earned Badges</h3>
              <div className="badges-grid">
                {hackerrankData.badges.map((badge, index) => (
                  <div key={index} className="badge-card">
                    <div 
                      className="badge-icon"
                      style={{ backgroundColor: getBadgeColor(badge.stars) }}
                    >
                      ⭐
                    </div>
                    <div className="badge-info">
                      <h4>{badge.name}</h4>
                      <p>Earned on {new Date(badge.earned_date).toLocaleDateString()}</p>
                      <div className="badge-stars">
                        {'★'.repeat(badge.stars)}{'☆'.repeat(4 - badge.stars)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificates Section */}
            {hackerrankData.certificates.length > 0 && (
              <div className="certificates-section glass-card fade-in">
                <h3>Certificates</h3>
                <div className="certificates-grid">
                  {hackerrankData.certificates.map((cert, index) => (
                    <div key={index} className="certificate-card">
                      <div className="certificate-icon">📜</div>
                      <div className="certificate-info">
                        <h4>{cert.name}</h4>
                        <p>Score: {cert.score}%</p>
                        <span className="certificate-date">
                          Issued: {new Date(cert.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Submissions */}
            <div className="submissions-section glass-card fade-in">
              <h3>Recent Submissions</h3>
              <div className="submissions-table">
                <div className="table-header">
                  <span>Problem</span>
                  <span>Difficulty</span>
                  <span>Status</span>
                  <span>Date</span>
                </div>
                {hackerrankData.recent_submissions.map((submission, index) => (
                  <div key={index} className="table-row">
                    <span className="problem-name">{submission.problem}</span>
                    <span 
                      className="difficulty"
                      style={{ color: getDifficultyColor(submission.difficulty) }}
                    >
                      {submission.difficulty}
                    </span>
                    <span className={`status ${submission.status.toLowerCase()}`}>
                      {submission.status}
                    </span>
                    <span className="submission-date">
                      {new Date(submission.date).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Stats */}
            <div className="skills-section glass-card fade-in">
              <h3>Skill Statistics</h3>
              <div className="skills-grid">
                {Object.entries(hackerrankData.skill_stats).map(([skill, score]) => (
                  <div key={skill} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill}</span>
                      <span className="skill-score">{score}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress"
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {!hackerrankData && !loading && (
          <div className="placeholder-section glass-card">
            <div className="placeholder-content">
              <h3>👆 Enter a HackerRank Username</h3>
              <p>Enter a HackerRank username above to see their profile data, badges, certificates, and coding statistics.</p>
              <div className="placeholder-tips">
                <h4>Try these demo usernames:</h4>
                <div className="suggested-users">
                  {['demo', 'coder123', 'hackerpro', 'algorithm_master', 'python_expert'].map(user => (
                    <button
                      key={user}
                      className="suggested-user"
                      onClick={() => {
                        setUsername(user);
                        fetchHackerrankData(user);
                      }}
                    >
                      {user}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompiCode;