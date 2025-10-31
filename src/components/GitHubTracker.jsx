import React, { useState, useEffect } from 'react';
import './GitHubTracker.css';

const GitHubTracker = ({ user }) => {
  const [githubData, setGithubData] = useState(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch real GitHub data
  const fetchGitHubData = async (username) => {
    setLoading(true);
    setError('');
    setGithubData(null);

    try {
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) {
        throw new Error('User not found');
      }
      const userData = await userResponse.json();

      // Fetch repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=8`);
      const reposData = await reposResponse.json();

      // Fetch contribution data (using GitHub's events API)
      const eventsResponse = await fetch(`https://api.github.com/users/${username}/events?per_page=100`);
      const eventsData = await eventsResponse.ok ? await eventsResponse.json() : [];

      // Process contribution data
      const contributionData = processContributionData(eventsData);

      // Fetch organizations
      const orgsResponse = await fetch(`https://api.github.com/users/${username}/orgs`);
      const orgsData = await orgsResponse.ok ? await orgsResponse.json() : [];

      const completeData = {
        user: userData,
        repos: reposData,
        contributions: contributionData,
        organizations: orgsData
      };

      setGithubData(completeData);
    } catch (err) {
      setError(err.message || 'Failed to fetch GitHub data');
      console.error('Error fetching GitHub data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Process GitHub events to get contribution data
  const processContributionData = (events) => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toISOString().split('T')[0];
    });

    const contributionMap = {};
    events.forEach(event => {
      const date = event.created_at.split('T')[0];
      if (contributionMap[date]) {
        contributionMap[date]++;
      } else {
        contributionMap[date] = 1;
      }
    });

    return last30Days.map(date => ({
      date,
      count: contributionMap[date] || 0
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      fetchGitHubData(username.trim());
    }
  };

  // Format number with commas
  const formatNumber = (num) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '0';
  };

  // Get programming language color
  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#f1e05a',
      Python: '#3572A5',
      Java: '#b07219',
      TypeScript: '#2b7489',
      'C++': '#f34b7d',
      CSS: '#563d7c',
      HTML: '#e34c26',
      PHP: '#4F5D95',
      Ruby: '#701516',
      Go: '#00ADD8',
      Rust: '#dea584',
      'C#': '#178600',
      Swift: '#ffac45',
      Kotlin: '#F18E33',
      Dart: '#00B4AB',
      Vue: '#2c3e50',
      React: '#61dafb',
      'Jupyter Notebook': '#DA5B0B',
      Shell: '#89e051',
      PowerShell: '#012456',
      Scala: '#c22d40',
      Perl: '#0298c3',
      Lua: '#000080',
      Haskell: '#5e5086',
      Clojure: '#db5855',
      Elixir: '#6e4a7e',
      Erlang: '#B83998',
      MATLAB: '#e16737',
      R: '#198CE7',
      'Objective-C': '#438eff',
      Groovy: '#e69f56',
      TeX: '#3D6117'
    };
    return colors[language] || '#6c757d';
  };

  // Calculate account age
  const getAccountAge = (createdAt) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''}${months > 0 ? `, ${months} month${months > 1 ? 's' : ''}` : ''}`;
    }
    return `${months} month${months > 1 ? 's' : ''}`;
  };

  return (
    <div className="github-tracker-container">
      <div className="github-header fade-in">
        <h1>GitHub Progress Tracker</h1>
        <p>Connect your GitHub profile to track your coding journey</p>
      </div>

      <div className="github-content">
        {/* GitHub Username Input */}
        <div className="search-section glass-card">
          <form onSubmit={handleSubmit} className="github-search">
            <input
              type="text"
              placeholder="Enter your GitHub username"
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
              ⚠️ {error}. Please check the username and try again.
            </div>
          )}
        </div>

        {loading && (
          <div className="loading glass-card">
            <div className="loading-spinner"></div>
            <p>Fetching real GitHub data...</p>
          </div>
        )}

        {githubData && !loading && (
          <>
            {/* User Profile */}
            <div className="profile-section glass-card fade-in">
              <div className="profile-header">
                <img 
                  src={githubData.user.avatar_url} 
                  alt={githubData.user.login}
                  className="profile-avatar"
                />
                <div className="profile-info">
                  <h2>{githubData.user.name || githubData.user.login}</h2>
                  <p>@{githubData.user.login}</p>
                  {githubData.user.bio && (
                    <p className="profile-bio">{githubData.user.bio}</p>
                  )}
                  {githubData.user.location && (
                    <p className="profile-location">📍 {githubData.user.location}</p>
                  )}
                  <div className="profile-stats">
                    <div className="stat">
                      <strong>{formatNumber(githubData.user.public_repos)}</strong>
                      <span>Repositories</span>
                    </div>
                    <div className="stat">
                      <strong>{formatNumber(githubData.user.followers)}</strong>
                      <span>Followers</span>
                    </div>
                    <div className="stat">
                      <strong>{formatNumber(githubData.user.following)}</strong>
                      <span>Following</span>
                    </div>
                    <div className="stat">
                      <strong>{getAccountAge(githubData.user.created_at)}</strong>
                      <span>On GitHub</span>
                    </div>
                  </div>
                </div>
              </div>
              {githubData.organizations.length > 0 && (
                <div className="organizations-section">
                  <h4>Organizations</h4>
                  <div className="orgs-list">
                    {githubData.organizations.map(org => (
                      <div key={org.id} className="org-item">
                        <img src={org.avatar_url} alt={org.login} className="org-avatar" />
                        <span>{org.login}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Activity Chart */}
            <div className="activity-section glass-card fade-in">
              <h3>Recent Activity (Last 30 Days)</h3>
              <div className="activity-chart">
                {githubData.contributions.map((day, index) => (
                  <div key={index} className="activity-day">
                    <div 
                      className="activity-bar"
                      style={{ 
                        height: `${Math.min((day.count / 10) * 100, 100)}%`,
                        opacity: day.count > 0 ? 0.3 + (day.count / 10) * 0.7 : 0.1,
                        backgroundColor: day.count > 0 ? '#28a745' : '#e9ecef'
                      }}
                      title={`${day.count} contributions on ${new Date(day.date).toLocaleDateString()}`}
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
                    {githubData.contributions.reduce((sum, day) => sum + day.count, 0)}
                  </strong>
                  <span>Total contributions (30 days)</span>
                </div>
                <div className="activity-stat">
                  <strong>
                    {githubData.contributions.filter(day => day.count > 0).length}
                  </strong>
                  <span>Active days</span>
                </div>
              </div>
            </div>

            {/* Repositories */}
            <div className="repos-section glass-card fade-in">
              <h3>Recent Repositories</h3>
              <div className="repos-grid">
                {githubData.repos.map(repo => (
                  <div key={repo.id} className="repo-card">
                    <div className="repo-header">
                      <h4>
                        <a 
                          href={repo.html_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="repo-link"
                        >
                          {repo.name}
                        </a>
                      </h4>
                      {repo.fork && <span className="repo-fork">Fork</span>}
                    </div>
                    <p className="repo-description">
                      {repo.description || 'No description provided'}
                    </p>
                    {repo.language && (
                      <div className="repo-language">
                        <span 
                          className="language-color"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        ></span>
                        {repo.language}
                      </div>
                    )}
                    <div className="repo-stats">
                      <span className="repo-stat">
                        ⭐ {formatNumber(repo.stargazers_count)}
                      </span>
                      <span className="repo-stat">
                        🍴 {formatNumber(repo.forks_count)}
                      </span>
                      <span className="repo-stat">
                        📝 {formatNumber(repo.open_issues_count)}
                      </span>
                      <span className="repo-updated">
                        Updated {new Date(repo.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Stats */}
            <div className="stats-section glass-card fade-in">
              <h3>GitHub Statistics</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-icon">📚</div>
                  <div className="stat-info">
                    <div className="stat-number">{formatNumber(githubData.user.public_repos)}</div>
                    <div className="stat-label">Public Repositories</div>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">👥</div>
                  <div className="stat-info">
                    <div className="stat-number">{formatNumber(githubData.user.followers)}</div>
                    <div className="stat-label">Followers</div>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">❤️</div>
                  <div className="stat-info">
                    <div className="stat-number">{formatNumber(githubData.user.following)}</div>
                    <div className="stat-label">Following</div>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">📅</div>
                  <div className="stat-info">
                    <div className="stat-number">
                      {new Date(githubData.user.created_at).getFullYear()}
                    </div>
                    <div className="stat-label">Joined GitHub</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {!githubData && !loading && (
          <div className="placeholder-section glass-card">
            <div className="placeholder-content">
              <h3>👆 Enter a GitHub Username</h3>
              <p>Enter a GitHub username above to see their profile data, repositories, and activity statistics.</p>
              <div className="placeholder-tips">
                <h4>Try these popular developers:</h4>
                <div className="suggested-users">
                  {['torvalds', 'gaearon', 'sindresorhus', 'yyx990803', 'jwasham'].map(user => (
                    <button
                      key={user}
                      className="suggested-user"
                      onClick={() => {
                        setUsername(user);
                        fetchGitHubData(user);
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

export default GitHubTracker;