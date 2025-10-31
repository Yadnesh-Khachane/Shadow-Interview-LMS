import React, { useState, useEffect } from "react";
import "./courseplan.css";

function CoursePlan() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark/light mode based on body class
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

  const courses = [
    {
      name: "Data Structures and Algorithms (DSA)",
      code: "CSE201",
      color: "#2563eb",
      emoji: "📊",
      syllabus: [
        "Introduction to Algorithms and Complexity Analysis",
        "Arrays, Linked Lists, Stacks, and Queues",
        "Recursion and Divide & Conquer",
        "Trees (BST, AVL, B-Tree) and Graphs (DFS, BFS)",
        "Sorting, Searching, and Hashing Techniques",
        "Dynamic Programming and Greedy Algorithms",
      ],
    },
    {
      name: "Database Management Systems (DBMS)",
      code: "CSE301",
      color: "#22c55e",
      emoji: "🗄️",
      syllabus: [
        "Introduction to Databases and Data Models",
        "ER Modeling and Normalization",
        "SQL Queries and Joins",
        "Transactions and Concurrency Control",
        "Indexing and Query Optimization",
      ],
    },
    {
      name: "Operating Systems (OS)",
      code: "CSE302",
      color: "#f97316",
      emoji: "💻",
      syllabus: [
        "System Structure and OS Components",
        "Process Management and Scheduling",
        "Threads and Synchronization",
        "Deadlocks and Memory Management",
        "File Systems and Disk Scheduling",
      ],
    },
    {
      name: "Computer Networks (CN)",
      code: "CSE401",
      color: "#a855f7",
      emoji: "🌐",
      syllabus: [
        "Network Models and OSI Layers",
        "Physical and Data Link Layer",
        "Network and Transport Layer",
        "Application Layer and Protocols",
        "Network Security Basics",
      ],
    },
    {
      name: "Artificial Intelligence (AI)",
      code: "CSE501",
      color: "#eab308",
      emoji: "🤖",
      syllabus: [
        "Introduction to AI and Agents",
        "Search Algorithms: BFS, DFS, A*",
        "Knowledge Representation",
        "Machine Learning Overview",
        "AI Applications and Case Study",
      ],
    },
  ];

  return (
    <div className="course-plan-container">
      <h1 className="course-plan-title">📘 Course & Lecture Plan</h1>

      {expandedIndex === null ? (
        <div className="course-cards">
          {courses.map((course, index) => (
            <div
              key={index}
              className="course-card"
              onClick={() => setExpandedIndex(index)}
              style={{ borderLeftColor: course.color }}
            >
              <div className="course-emoji">{course.emoji}</div>
              <h3>{course.name}</h3>
              <p>{course.code}</p>
              <button 
                className="open-course-btn"
                style={{ backgroundColor: course.color }}
              >
                Open Course
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div 
          className="expanded-course-view"
          style={{ borderLeftColor: courses[expandedIndex].color }}
        >
          <div className="expanded-emoji">{courses[expandedIndex].emoji}</div>
          <h2>{courses[expandedIndex].name}</h2>
          <p>
            <strong>Code:</strong> {courses[expandedIndex].code}
          </p>
          <ul className="syllabus-list">
            {courses[expandedIndex].syllabus.map((topic, i) => (
              <li key={i}>{topic}</li>
            ))}
          </ul>

          <button
            className="back-btn"
            onClick={() => setExpandedIndex(null)}
          >
            Back to Courses
          </button>
        </div>
      )}
    </div>
  );
}

export default CoursePlan;