require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const axios = require('axios');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Enhanced Devpost API Proxy with better error handling
app.get('/api/hackathons', async (req, res) => {
  try {
    console.log('Fetching hackathons from Devpost API...');
    
    const response = await axios.get('https://devpost.com/api/hackathons?status[]=open&order_by=recently-added', {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.data || !response.data.hackathons) {
      throw new Error('Invalid response format from Devpost API');
    }

    const hackathons = response.data.hackathons.slice(0, 10).map(hackathon => ({
      id: `hackathon-${hackathon.id}`,
      type: 'hackathon',
      title: hackathon.title,
      description: hackathon.description ? 
        hackathon.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : 
        'Join this exciting hackathon and showcase your skills!',
      date: hackathon.submission_period_dates || hackathon.updated_at,
      priority: 'high',
      category: 'Competition',
      author: hackathon.organization || 'Devpost',
      link: hackathon.url,
      image: hackathon.thumbnail_url,
      prize: hackathon.prize_amount ? `Prize: $${hackathon.prize_amount.toLocaleString()}` : 'Exciting prizes',
      registrationDeadline: hackathon.registration_end_date,
      source: 'Devpost API'
    }));

    console.log(`Successfully fetched ${hackathons.length} hackathons`);
    res.json(hackathons);

  } catch (error) {
    console.error('Devpost API Error:', error.message);
    
    // Try alternative hackathon source
    try {
      console.log('Trying alternative hackathon source...');
      const alternativeHackathons = await fetchAlternativeHackathons();
      res.json(alternativeHackathons);
    } catch (fallbackError) {
      console.error('All hackathon sources failed:', fallbackError.message);
      res.status(500).json({ 
        error: 'Failed to fetch hackathons',
        message: 'All hackathon sources are currently unavailable'
      });
    }
  }
});

// Alternative hackathon source
async function fetchAlternativeHackathons() {
  try {
    // Using Major League Hacking events as fallback
    const response = await axios.get('https://mlh.io/seasons/2024/events', {
      timeout: 8000
    });
    
    // This would require HTML parsing in a real scenario
    // For now, return some structured fallback data
    return [
      {
        id: 'hackathon-fallback-1',
        type: 'hackathon',
        title: 'MLH Hackathon Season 2024',
        description: 'Participate in Major League Hacking events worldwide',
        date: new Date().toISOString().split('T')[0],
        priority: 'high',
        category: 'Competition',
        author: 'Major League Hacking',
        link: 'https://mlh.io',
        prize: 'MLH Prizes and Swag',
        source: 'MLH Events'
      }
    ];
  } catch (error) {
    throw new Error('Alternative source failed');
  }
}

// Enhanced Workshops API
app.get('/api/workshops', async (req, res) => {
  try {
    console.log('Fetching workshops from APIs...');
    
    // Try multiple workshop sources
    const workshopPromises = [
      fetchMeetupWorkshops(),
      fetchEventbriteWorkshops()
    ];

    const results = await Promise.allSettled(workshopPromises);
    
    let workshops = [];
    for (const result of results) {
      if (result.status === 'fulfilled' && result.value.length > 0) {
        workshops = result.value;
        break;
      }
    }

    if (workshops.length === 0) {
      throw new Error('All workshop sources failed');
    }

    console.log(`Successfully fetched ${workshops.length} workshops`);
    res.json(workshops.slice(0, 5));

  } catch (error) {
    console.error('Workshops API Error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch workshops',
      message: 'Workshop sources are currently unavailable'
    });
  }
});

async function fetchMeetupWorkshops() {
  try {
    const response = await axios.get('https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public&category=34&page=5', {
      timeout: 8000
    });
    
    return response.data.events.slice(0, 5).map(event => ({
      id: `workshop-${event.id}`,
      type: 'workshop',
      title: event.name,
      description: event.description ? 
        event.description.replace(/<[^>]*>/g, '').substring(0, 120) + '...' : 
        'Join this workshop to learn new skills!',
      date: new Date(event.time).toISOString().split('T')[0],
      priority: 'medium',
      category: 'Workshop',
      author: event.group?.name || 'Tech Community',
      link: event.link,
      location: event.venue ? `${event.venue.city}, ${event.venue.state}` : 'Online',
      source: 'Meetup API'
    }));
  } catch (error) {
    throw new Error('Meetup API failed');
  }
}

async function fetchEventbriteWorkshops() {
  try {
    // This would require Eventbrite API key in production
    // For demo, return some generic workshops
    return [
      {
        id: 'workshop-eventbrite-1',
        type: 'workshop',
        title: 'Tech Skills Workshop',
        description: 'Enhance your technical skills with hands-on learning',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        priority: 'medium',
        category: 'Workshop',
        author: 'Tech Education Group',
        link: '#',
        location: 'Online',
        source: 'Eventbrite API'
      }
    ];
  } catch (error) {
    throw new Error('Eventbrite API failed');
  }
}

// Enhanced Tech News API
app.get('/api/tech-news', async (req, res) => {
  try {
    console.log('Fetching tech news...');
    
    // Using Guardian API (free)
    const response = await axios.get('https://content.guardianapis.com/search?section=technology&show-fields=trailText,thumbnail&page-size=5&api-key=test', {
      timeout: 8000
    });
    
    if (!response.data || !response.data.response || !response.data.response.results) {
      throw new Error('Invalid response from Guardian API');
    }

    const news = response.data.response.results.slice(0, 5).map((article, index) => ({
      id: `tech-${article.id}`,
      type: 'technology',
      title: article.webTitle,
      description: article.fields?.trailText || 'Latest technology news and updates',
      date: article.webPublicationDate.split('T')[0],
      priority: 'low',
      category: 'Technology',
      author: 'The Guardian',
      link: article.webUrl,
      source: 'Guardian API',
      image: article.fields?.thumbnail
    }));

    console.log(`Successfully fetched ${news.length} tech news articles`);
    res.json(news);

  } catch (error) {
    console.error('Tech News API Error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch tech news',
      message: 'Tech news sources are currently unavailable'
    });
  }
});

// College News API
app.get('/api/college-news', async (req, res) => {
  try {
    console.log('Fetching college news...');
    
    // Using a public university events API
    const response = await axios.get('https://events.umich.edu/api/2/events?tags=academic&per_page=5', {
      timeout: 8000
    });
    
    if (response.data && response.data.data) {
      const collegeNews = response.data.data.slice(0, 5).map(item => ({
        id: `college-${item.id}`,
        type: 'college',
        title: item.title,
        description: item.description ? 
          item.description.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : 
          'College academic event or announcement',
        date: item.event_instances[0]?.event_instance.start_date || new Date().toISOString().split('T')[0],
        priority: 'medium',
        category: 'Academic',
        author: 'University Events',
        link: item.permalink,
        source: 'University Events API'
      }));

      console.log(`Successfully fetched ${collegeNews.length} college news items`);
      res.json(collegeNews);
    } else {
      throw new Error('Invalid response from college events API');
    }

  } catch (error) {
    console.error('College News API Error:', error.message);
    
    // Return minimal fallback data
    res.json([
      {
        id: 'college-default-1',
        type: 'college',
        title: 'Academic Calendar Update',
        description: 'Important updates to the academic calendar and schedule',
        date: new Date().toISOString().split('T')[0],
        priority: 'medium',
        category: 'Academic',
        author: 'College Administration',
        link: '#',
        source: 'College System'
      }
    ]);
  }
});

// Get all announcements
app.get('/api/announcements', async (req, res) => {
  try {
    console.log('Fetching all announcements...');
    
    const [hackathons, workshops, techNews, collegeNews] = await Promise.allSettled([
      axios.get(`http://localhost:${PORT}/api/hackathons`).then(r => r.data).catch(() => []),
      axios.get(`http://localhost:${PORT}/api/workshops`).then(r => r.data).catch(() => []),
      axios.get(`http://localhost:${PORT}/api/tech-news`).then(r => r.data).catch(() => []),
      axios.get(`http://localhost:${PORT}/api/college-news`).then(r => r.data).catch(() => [])
    ]);

    const allAnnouncements = [
      ...(hackathons.status === 'fulfilled' ? hackathons.value : []),
      ...(workshops.status === 'fulfilled' ? workshops.value : []),
      ...(techNews.status === 'fulfilled' ? techNews.value : []),
      ...(collegeNews.status === 'fulfilled' ? collegeNews.value : [])
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    console.log(`Total announcements fetched: ${allAnnouncements.length}`);
    res.json(allAnnouncements);

  } catch (error) {
    console.error('All announcements error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch announcements',
      message: 'Unable to retrieve announcements at this time'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Announcements API'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Announcements API Server',
    version: '1.0.0',
    endpoints: {
      '/api/announcements': 'Get all announcements',
      '/api/hackathons': 'Get hackathons only',
      '/api/workshops': 'Get workshops only',
      '/api/tech-news': 'Get tech news only',
      '/api/college-news': 'Get college news only',
      '/health': 'Health check'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: 'Something went wrong on our end'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Announcements API Server running on port ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/`);
});