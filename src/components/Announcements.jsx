import React, { useState, useEffect } from 'react';
import './Announcements.css';

const Announcements = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [apiStatus, setApiStatus] = useState({
    hackathons: 'checking',
    workshops: 'checking',
    techNews: 'checking',
    collegeNews: 'checking'
  });

  // Backend API URL - adjust based on your environment
  const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-domain.com/api'  // Production URL
    : 'http://localhost:5000/api';           // Development URL

  // Fetch all announcements from backend API
  useEffect(() => {
    const fetchAllAnnouncements = async () => {
      setLoading(true);
      setError('');
      
      try {
        console.log('Fetching announcements from:', `${API_BASE_URL}/announcements`);
        
        const response = await fetch(`${API_BASE_URL}/announcements`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Backend responded with status: ${response.status}`);
        }

        const data = await response.json();
        
        // Check if we got an error object instead of announcements array
        if (data.error) {
          throw new Error(data.message || data.error);
        }

        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from server');
        }

        setAnnouncements(data);
        
        // Update API status based on data received
        const status = {
          hackathons: data.some(item => item.type === 'hackathon') ? 'success' : 'failed',
          workshops: data.some(item => item.type === 'workshop') ? 'success' : 'failed',
          techNews: data.some(item => item.type === 'technology') ? 'success' : 'failed',
          collegeNews: data.some(item => item.type === 'college') ? 'success' : 'failed'
        };
        
        setApiStatus(status);
        
        console.log(`Successfully loaded ${data.length} announcements`);
        console.log('API Status:', status);

      } catch (err) {
        console.error('Error fetching announcements:', err);
        setError(`Failed to load announcements: ${err.message}`);
        setAnnouncements([]);
        
        // Set all status to failed
        setApiStatus({
          hackathons: 'failed',
          workshops: 'failed',
          techNews: 'failed',
          collegeNews: 'failed'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAllAnnouncements();
  }, [API_BASE_URL]);

  // Function to refetch data (useful for refresh button)
  const refetchData = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/announcements`);
      
      if (!response.ok) {
        throw new Error(`Backend responded with status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.message || data.error);
      }

      setAnnouncements(data);
      
      // Update status
      setApiStatus({
        hackathons: data.some(item => item.type === 'hackathon') ? 'success' : 'failed',
        workshops: data.some(item => item.type === 'workshop') ? 'success' : 'failed',
        techNews: data.some(item => item.type === 'technology') ? 'success' : 'failed',
        collegeNews: data.some(item => item.type === 'college') ? 'success' : 'failed'
      });

    } catch (err) {
      console.error('Error refetching data:', err);
      setError(`Failed to refresh data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch individual category data
  const fetchCategoryData = async (category) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${category}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${category}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.message || data.error);
      }
      
      return data;
    } catch (error) {
      console.error(`Error fetching ${category}:`, error);
      throw error;
    }
  };

  const categories = [
    { id: 'all', name: 'All Announcements', icon: '📢' },
    { id: 'college', name: 'College News', icon: '🏫' },
    { id: 'hackathon', name: 'Hackathons', icon: '💻' },
    { id: 'workshop', name: 'Workshops', icon: '🎓' },
    { id: 'technology', name: 'Tech News', icon: '🚀' }
  ];

  const filteredAnnouncements = activeCategory === 'all' 
    ? announcements 
    : announcements.filter(announcement => announcement.type === activeCategory);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#fd7e14';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'college': return '🏫';
      case 'hackathon': return '💻';
      case 'workshop': return '🎓';
      case 'technology': return '🚀';
      default: return '📢';
    }
  };

  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'Date TBA';
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Date TBA';
    }
  };

  const handleLinkClick = (link, title) => {
    if (link && link !== '#') {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return '✅';
      case 'checking': return '🔄';
      case 'failed': return '❌';
      default: return '⏳';
    }
  };

  if (loading) {
    return (
      <div className="announcements-container">
        <div className="announcements-header fade-in">
          <h1>Announcements 📢</h1>
          <p>Stay updated with latest news and events</p>
        </div>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Fetching real-time data from backend API...</p>
          <div className="api-status-loading">
            <div>Hackathons: {getStatusIcon(apiStatus.hackathons)}</div>
            <div>Workshops: {getStatusIcon(apiStatus.workshops)}</div>
            <div>Tech News: {getStatusIcon(apiStatus.techNews)}</div>
            <div>College News: {getStatusIcon(apiStatus.collegeNews)}</div>
          </div>
          <p className="backend-info">Connecting to: {API_BASE_URL}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="announcements-container">
      <div className="announcements-header fade-in">
        <h1>Announcements 📢</h1>
        <p>Stay updated with latest news and events</p>
        
        {/* Refresh Button */}
        <button 
          className="refresh-btn"
          onClick={refetchData}
          disabled={loading}
        >
          🔄 Refresh Data
        </button>

        {error && (
          <div className="error-banner">
            ⚠️ {error}
            <br />
            <small>Make sure your backend server is running on {API_BASE_URL}</small>
          </div>
        )}
      </div>

      <div className="announcements-content">
        {/* Categories Filter */}
        <div className="categories-section glass-card">
          <h3>Filter by Category</h3>
          <div className="categories-grid">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* API Status */}
        <div className="api-status glass-card">
          <h4>Backend Data Sources</h4>
          <div className="status-grid">
            <div className="status-item">
              <span className="status-icon">💻</span>
              <span className="status-text">Hackathons: Devpost API</span>
              <span className="status-indicator">{getStatusIcon(apiStatus.hackathons)}</span>
            </div>
            <div className="status-item">
              <span className="status-icon">🎓</span>
              <span className="status-text">Workshops: Meetup API</span>
              <span className="status-indicator">{getStatusIcon(apiStatus.workshops)}</span>
            </div>
            <div className="status-item">
              <span className="status-icon">🚀</span>
              <span className="status-text">Tech News: Guardian API</span>
              <span className="status-indicator">{getStatusIcon(apiStatus.techNews)}</span>
            </div>
            <div className="status-item">
              <span className="status-icon">🏫</span>
              <span className="status-text">College News: Events API</span>
              <span className="status-indicator">{getStatusIcon(apiStatus.collegeNews)}</span>
            </div>
          </div>
          <div className="data-notice">
            📍 All data fetched via backend server at: {API_BASE_URL}
          </div>
        </div>

        {/* Announcements Grid */}
        <div className="announcements-grid">
          {filteredAnnouncements.map(announcement => (
            <div key={announcement.id} className="announcement-card glass-card">
              <div className="announcement-header">
                <div className="announcement-type">
                  <span className="type-icon">{getTypeIcon(announcement.type)}</span>
                  <span className="type-category">{announcement.category}</span>
                  {announcement.source && (
                    <span className="source-tag live">
                      {announcement.source}
                    </span>
                  )}
                </div>
                <div 
                  className="priority-badge"
                  style={{ backgroundColor: getPriorityColor(announcement.priority) }}
                >
                  {announcement.priority}
                </div>
              </div>

              <div className="announcement-body">
                <h3 className="announcement-title">{announcement.title}</h3>
                <p className="announcement-description">{announcement.description}</p>
                
                {/* Additional info for specific types */}
                {announcement.prize && (
                  <div className="additional-info">
                    <span className="info-badge">🏆 {announcement.prize}</span>
                  </div>
                )}
                {announcement.registrationDeadline && (
                  <div className="additional-info">
                    <span className="info-badge">⏰ Reg ends: {formatDate(announcement.registrationDeadline)}</span>
                  </div>
                )}
                {announcement.location && (
                  <div className="additional-info">
                    <span className="info-badge">📍 {announcement.location}</span>
                  </div>
                )}
                {announcement.image && (
                  <div className="announcement-image">
                    <img src={announcement.image} alt={announcement.title} />
                  </div>
                )}
              </div>

              <div className="announcement-footer">
                <div className="announcement-meta">
                  <div className="announcement-author">
                    <span className="author-icon">👤</span>
                    {announcement.author}
                  </div>
                  <div className="announcement-date">
                    <span className="date-icon">📅</span>
                    {formatDate(announcement.date)}
                  </div>
                </div>
                
                {(announcement.link && announcement.link !== '#') && (
                  <button 
                    className="action-btn"
                    onClick={() => handleLinkClick(announcement.link, announcement.title)}
                  >
                    Learn More →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAnnouncements.length === 0 && (
          <div className="empty-state glass-card">
            <div className="empty-icon">📭</div>
            <h3>No announcements found</h3>
            <p>There are no real announcements in this category at the moment.</p>
            <div className="empty-state-actions">
              <button 
                className="btn-primary"
                onClick={() => setActiveCategory('all')}
              >
                View All Announcements
              </button>
              <button 
                className="btn-secondary"
                onClick={refetchData}
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="stats-section glass-card">
        <h3>Live Data Overview</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-icon">📢</div>
            <div className="stat-info">
              <div className="stat-number">{announcements.length}</div>
              <div className="stat-label">Total Real Announcements</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">🏫</div>
            <div className="stat-info">
              <div className="stat-number">
                {announcements.filter(a => a.type === 'college').length}
              </div>
              <div className="stat-label">College News</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">💻</div>
            <div className="stat-info">
              <div className="stat-number">
                {announcements.filter(a => a.type === 'hackathon').length}
              </div>
              <div className="stat-label">Hackathons</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">🎓</div>
            <div className="stat-info">
              <div className="stat-number">
                {announcements.filter(a => a.type === 'workshop').length}
              </div>
              <div className="stat-label">Workshops</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;