import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    studentId: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login/registration
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'Student User',
      email: formData.email,
      studentId: formData.studentId || 'STU' + Math.random().toString(36).substr(2, 6).toUpperCase()
    };
    onLogin(userData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <div className="login-card glass-card fade-in">
        <div className="login-header">
          <h1>EduProgress</h1>
          <p>Track Your Learning Journey</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="studentId"
                  placeholder="Student ID"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="btn-primary login-btn">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span 
              className="toggle-link"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;