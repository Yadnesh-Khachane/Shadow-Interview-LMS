import React, { useState, useEffect } from "react";
import "./Library.css";

function Library() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [expandedActivity, setExpandedActivity] = useState(null);

  // Detect dark/light mode
  useEffect(() => {
    const checkTheme = () => {
      const dark = document.body.classList.contains("dark-mode");
      setIsDarkMode(dark);
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Course Learning Subjects
  const courseSubjects = [
    {
      id: 1,
      name: "Data Structures & Algorithms",
      code: "CSE201 - DSA",
      emoji: "📊",
      color: "#2563eb",
      topics: [
        "Arrays & Linked Lists",
        "Stacks & Queues", 
        "Trees & Graphs",
        "Sorting Algorithms",
        "Dynamic Programming"
      ],
      studyContent: {
        overview: "Data Structures and Algorithms form the foundation of computer science. They help in writing efficient and optimized code for problem-solving.",
        keyConcepts: [
          "Time and Space Complexity Analysis",
          "Recursion and Backtracking",
          "Divide and Conquer Strategy", 
          "Graph Traversal (BFS, DFS)",
          "Dynamic Programming Patterns"
        ],
        resources: [
          "Introduction to Algorithms by Cormen",
          "Data Structures and Algorithms in Java",
          "LeetCode for practice problems"
        ]
      }
    },
    {
      id: 2,
      name: "Database Management Systems", 
      code: "CSE301 - DBMS",
      emoji: "🗄️",
      color: "#22c55e",
      topics: [
        "SQL & Normalization",
        "ER Diagrams",
        "Transactions & ACID",
        "Indexing & Optimization"
      ],
      studyContent: {
        overview: "DBMS deals with storage, retrieval, and management of data in databases. It ensures data consistency, security, and efficient access.",
        keyConcepts: [
          "ACID Properties",
          "Database Normalization",
          "SQL Queries and Joins",
          "Transaction Management"
        ],
        resources: [
          "Database System Concepts by Silberschatz",
          "SQL Practice on HackerRank",
          "MongoDB University courses"
        ]
      }
    },
    {
      id: 3,
      name: "Operating Systems",
      code: "CSE302 - OS", 
      emoji: "💻",
      color: "#f97316",
      topics: [
        "Process Management",
        "Memory Management", 
        "File Systems",
        "CPU Scheduling"
      ],
      studyContent: {
        overview: "Operating Systems manage computer hardware and software resources, providing common services for computer programs and users.",
        keyConcepts: [
          "Process vs Thread",
          "CPU Scheduling Algorithms",
          "Virtual Memory and Paging",
          "File System Implementation"
        ],
        resources: [
          "Operating System Concepts by Silberschatz",
          "Linux Kernel documentation",
          "OS development tutorials"
        ]
      }
    },
    {
      id: 4,
      name: "Computer Networks",
      code: "CSE401 - CN",
      emoji: "🌐", 
      color: "#a855f7",
      topics: [
        "OSI & TCP/IP Models",
        "Network Protocols",
        "Routing Algorithms", 
        "Network Security"
      ],
      studyContent: {
        overview: "Computer Networks enable communication between computers and devices. They form the backbone of modern internet and global connectivity.",
        keyConcepts: [
          "OSI and TCP/IP Reference Models",
          "IP Addressing and Subnetting",
          "Routing Protocols",
          "Network Security Principles"
        ],
        resources: [
          "Computer Networking by Kurose and Ross",
          "Cisco Networking Academy",
          "Wireshark for network analysis"
        ]
      }
    },
    {
      id: 5,
      name: "Artificial Intelligence",
      code: "CSE501 - AI",
      emoji: "🤖",
      color: "#eab308", 
      topics: [
        "Machine Learning",
        "Neural Networks",
        "Natural Language Processing",
        "Computer Vision"
      ],
      studyContent: {
        overview: "AI involves creating intelligent machines that can perform tasks typically requiring human intelligence, including learning and problem-solving.",
        keyConcepts: [
          "Machine Learning Algorithms",
          "Neural Networks and Deep Learning",
          "Natural Language Processing",
          "Computer Vision Techniques"
        ],
        resources: [
          "Artificial Intelligence: A Modern Approach",
          "TensorFlow and PyTorch frameworks",
          "Kaggle for AI competitions"
        ]
      }
    }
  ];

  // Extra Curricular Activities
  const extraActivities = [
    {
      id: 1,
      name: "Coding Competitions",
      emoji: "⚡",
      color: "#8b5cf6",
      description: "Participate in coding challenges on platforms like LeetCode, CodeChef, and HackerRank to improve problem-solving skills.",
      benefits: "Enhances logical thinking and coding speed",
      detailedContent: {
        platforms: [
          "LeetCode - Interview Preparation",
          "CodeChef - Competitive Programming", 
          "HackerRank - Skill Assessment",
          "CodeForces - Advanced Algorithms"
        ],
        preparationTips: [
          "Start with easy problems and gradually increase difficulty",
          "Practice daily for consistent improvement",
          "Learn time and space complexity analysis",
          "Participate in weekly contests"
        ]
      }
    },
    {
      id: 2,
      name: "Technical Projects",
      emoji: "🚀",
      color: "#06b6d4",
      description: "Build real-world projects to apply theoretical knowledge and create a strong portfolio for placements.",
      benefits: "Practical experience & portfolio building",
      detailedContent: {
        projectIdeas: [
          "E-commerce Website with payment integration",
          "Mobile App for task management",
          "Machine Learning model for prediction",
          "Social media platform clone"
        ],
        technologies: [
          "Web: React, Node.js, MongoDB",
          "Mobile: React Native, Flutter", 
          "AI/ML: Python, TensorFlow, PyTorch"
        ]
      }
    },
    {
      id: 3,
      name: "Open Source Contribution",
      emoji: "🔗",
      color: "#10b981",
      description: "Contribute to open-source projects on GitHub to collaborate with developers worldwide.",
      benefits: "Team collaboration & real-world experience",
      detailedContent: {
        gettingStarted: [
          "Find beginner-friendly issues on GitHub",
          "Start with documentation improvements",
          "Learn Git and GitHub workflow",
          "Join open-source communities"
        ],
        popularProjects: [
          "First Timers Only (beginner-friendly)",
          "Mozilla Firefox (web browser)",
          "VS Code (code editor)", 
          "TensorFlow (machine learning)"
        ]
      }
    }
  ];

  const toggleCourse = (course) => {
    if (expandedCourse?.id === course.id) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(course);
      setExpandedActivity(null);
    }
  };

  const toggleActivity = (activity) => {
    if (expandedActivity?.id === activity.id) {
      setExpandedActivity(null);
    } else {
      setExpandedActivity(activity);
      setExpandedCourse(null);
    }
  };

  // Expanded Course View
  const ExpandedCourseView = ({ course, onBack }) => (
    <div className="expanded-view">
      <div className="expanded-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="expanded-title">
          <span className="expanded-emoji">{course.emoji}</span>
          <div>
            <h2>{course.name}</h2>
            <p className="expanded-code">{course.code}</p>
          </div>
        </div>
      </div>

      <div className="expanded-content">
        <div className="content-section">
          <h3>📖 Overview</h3>
          <p>{course.studyContent.overview}</p>
        </div>

        <div className="content-section">
          <h3>🎯 Key Concepts</h3>
          <ul>
            {course.studyContent.keyConcepts.map((concept, idx) => (
              <li key={idx}>{concept}</li>
            ))}
          </ul>
        </div>

        <div className="content-section">
          <h3>📚 Important Topics</h3>
          <ul>
            {course.topics.map((topic, idx) => (
              <li key={idx}>{topic}</li>
            ))}
          </ul>
        </div>

        <div className="content-section">
          <h3>🔗 Recommended Resources</h3>
          <ul>
            {course.studyContent.resources.map((resource, idx) => (
              <li key={idx}>{resource}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  // Expanded Activity View
  const ExpandedActivityView = ({ activity, onBack }) => (
    <div className="expanded-view">
      <div className="expanded-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="expanded-title">
          <span className="expanded-emoji">{activity.emoji}</span>
          <div>
            <h2>{activity.name}</h2>
            <p className="activity-benefits">{activity.benefits}</p>
          </div>
        </div>
      </div>

      <div className="expanded-content">
        <div className="content-section">
          <h3>📝 Description</h3>
          <p>{activity.description}</p>
        </div>

        {activity.detailedContent.platforms && (
          <div className="content-section">
            <h3>🌐 Platforms & Resources</h3>
            <ul>
              {activity.detailedContent.platforms.map((platform, idx) => (
                <li key={idx}>{platform}</li>
              ))}
            </ul>
          </div>
        )}

        {activity.detailedContent.preparationTips && (
          <div className="content-section">
            <h3>💡 Preparation Tips</h3>
            <ul>
              {activity.detailedContent.preparationTips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        {activity.detailedContent.projectIdeas && (
          <div className="content-section">
            <h3>💡 Project Ideas</h3>
            <ul>
              {activity.detailedContent.projectIdeas.map((idea, idx) => (
                <li key={idx}>{idea}</li>
              ))}
            </ul>
          </div>
        )}

        {activity.detailedContent.technologies && (
          <div className="content-section">
            <h3>🛠️ Technologies to Learn</h3>
            <ul>
              {activity.detailedContent.technologies.map((tech, idx) => (
                <li key={idx}>{tech}</li>
              ))}
            </ul>
          </div>
        )}

        {activity.detailedContent.gettingStarted && (
          <div className="content-section">
            <h3>🚀 Getting Started</h3>
            <ul>
              {activity.detailedContent.gettingStarted.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="library-container">
      {/* Header */}
      <div className="library-header">
        <h1>📚 Learning Library</h1>
        <p>Course learning and extra curricular activities for holistic development</p>
      </div>

      <div className="main-cards-grid">
        {/* Course Learning Card */}
        <div className="main-card">
          <div className="main-card-header">
            <div className="main-card-icon">🎓</div>
            <div className="main-card-info">
              <h2>Course Learning</h2>
              <p>Core computer science subjects and academic resources</p>
            </div>
          </div>

          <div className="main-card-content">
            {expandedCourse ? (
              <ExpandedCourseView 
                course={expandedCourse} 
                onBack={() => setExpandedCourse(null)} 
              />
            ) : (
              <div className="items-grid">
                {courseSubjects.map((course) => (
                  <div
                    key={course.id}
                    className="item-card"
                    style={{ borderLeftColor: course.color }}
                    onClick={() => toggleCourse(course)}
                  >
                    <div className="item-emoji">{course.emoji}</div>
                    <h3>{course.name}</h3>
                    <p className="item-code">{course.code}</p>
                    <ul className="item-topics">
                      {course.topics.slice(0, 3).map((topic, idx) => (
                        <li key={idx}>• {topic}</li>
                      ))}
                    </ul>
                    <button
                      className="view-btn"
                      style={{ backgroundColor: course.color }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCourse(course);
                      }}
                    >
                      View Content
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Extra Curricular Card */}
        <div className="main-card">
          <div className="main-card-header">
            <div className="main-card-icon">🌟</div>
            <div className="main-card-info">
              <h2>Extra Curricular</h2>
              <p>Skills and activities beyond curriculum for holistic development</p>
            </div>
          </div>

          <div className="main-card-content">
            {expandedActivity ? (
              <ExpandedActivityView 
                activity={expandedActivity} 
                onBack={() => setExpandedActivity(null)} 
              />
            ) : (
              <div className="items-grid">
                {extraActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="item-card"
                    style={{ borderLeftColor: activity.color }}
                    onClick={() => toggleActivity(activity)}
                  >
                    <div className="item-emoji">{activity.emoji}</div>
                    <h3>{activity.name}</h3>
                    <p className="item-description">{activity.description}</p>
                    <small className="item-benefits">
                      💡 {activity.benefits}
                    </small>
                    <button
                      className="view-btn"
                      style={{ backgroundColor: activity.color }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleActivity(activity);
                      }}
                    >
                      Explore
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Library;