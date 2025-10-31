import React, { useState, useEffect } from 'react';
import './MathChallenge.css';

const MathChallenge = ({ onClose }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [quizStarted, setQuizStarted] = useState(false);

  // Generate random math questions
  const generateQuestions = () => {
    const newQuestions = [];
    
    for (let i = 0; i < 5; i++) {
      const type = Math.floor(Math.random() * 4); // 0: addition, 1: subtraction, 2: multiplication, 3: division
      
      let question, correctAnswer, options;
      
      switch (type) {
        case 0: // Addition
          const a1 = Math.floor(Math.random() * 50) + 1;
          const b1 = Math.floor(Math.random() * 50) + 1;
          question = `What is ${a1} + ${b1}?`;
          correctAnswer = a1 + b1;
          options = generateOptions(correctAnswer, 'addition');
          break;
          
        case 1: // Subtraction
          const a2 = Math.floor(Math.random() * 100) + 1;
          const b2 = Math.floor(Math.random() * a2) + 1;
          question = `What is ${a2} - ${b2}?`;
          correctAnswer = a2 - b2;
          options = generateOptions(correctAnswer, 'subtraction');
          break;
          
        case 2: // Multiplication
          const a3 = Math.floor(Math.random() * 12) + 1;
          const b3 = Math.floor(Math.random() * 12) + 1;
          question = `What is ${a3} × ${b3}?`;
          correctAnswer = a3 * b3;
          options = generateOptions(correctAnswer, 'multiplication');
          break;
          
        case 3: // Division
          const divisor = Math.floor(Math.random() * 10) + 2;
          const result = Math.floor(Math.random() * 10) + 1;
          const dividend = divisor * result;
          question = `What is ${dividend} ÷ ${divisor}?`;
          correctAnswer = result;
          options = generateOptions(correctAnswer, 'division');
          break;
          
        default:
          break;
      }
      
      newQuestions.push({
        id: i + 1,
        question,
        options,
        correctAnswer,
        type: ['Addition', 'Subtraction', 'Multiplication', 'Division'][type]
      });
    }
    
    return newQuestions;
  };

  const generateOptions = (correctAnswer, operation) => {
    const options = [correctAnswer];
    
    while (options.length < 4) {
      let randomOption;
      const variance = operation === 'multiplication' || operation === 'division' ? 5 : 10;
      
      do {
        randomOption = correctAnswer + Math.floor(Math.random() * variance * 2) - variance;
        // Ensure no negative numbers for certain operations
        if (operation === 'subtraction' && randomOption < 0) {
          randomOption = Math.abs(randomOption);
        }
        if (operation === 'division' && randomOption < 1) {
          randomOption = 1;
        }
      } while (options.includes(randomOption) || randomOption === correctAnswer);
      
      options.push(randomOption);
    }
    
    // Shuffle options
    return options.sort(() => Math.random() - 0.5);
  };

  const startQuiz = () => {
    setQuestions(generateQuestions());
    setQuizStarted(true);
    setTimeLeft(300); // 5 minutes
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    setSelectedAnswer(null);
    
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setQuestions(generateQuestions());
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(300);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      setShowResult(true);
    }
  }, [timeLeft, quizStarted, showResult]);

  if (!quizStarted) {
    return (
      <div className="math-challenge-modal">
        <div className="math-challenge-content glass-card">
          <div className="quiz-header">
            <h2>🧮 Math Challenge</h2>
            <button className="close-btn" onClick={onClose}>✕</button>
          </div>
          <div className="quiz-instructions">
            <h3>Welcome to Math Challenge!</h3>
            <div className="instructions-list">
              <div className="instruction-item">
                <span className="instruction-icon">📝</span>
                <div>
                  <strong>5 Random Questions</strong>
                  <p>Each game features 5 unique math problems</p>
                </div>
              </div>
              <div className="instruction-item">
                <span className="instruction-icon">⏱️</span>
                <div>
                  <strong>5 Minute Timer</strong>
                  <p>Complete the quiz before time runs out</p>
                </div>
              </div>
              <div className="instruction-item">
                <span className="instruction-icon">🎯</span>
                <div>
                  <strong>Multiple Choice</strong>
                  <p>Choose the correct answer from 4 options</p>
                </div>
              </div>
              <div className="instruction-item">
                <span className="instruction-icon">⭐</span>
                <div>
                  <strong>Instant Feedback</strong>
                  <p>See your score immediately after completion</p>
                </div>
              </div>
            </div>
            <button className="btn-primary start-btn" onClick={startQuiz}>
              Start Challenge
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="math-challenge-modal">
        <div className="math-challenge-content glass-card">
          <div className="quiz-header">
            <h2>🎯 Quiz Results</h2>
            <button className="close-btn" onClick={onClose}>✕</button>
          </div>
          <div className="result-content">
            <div className="score-display">
              <div className="score-circle">
                <span className="score-number">{score}</span>
                <span className="score-total">/5</span>
              </div>
              <div className="score-percentage">
                {Math.round((score / 5) * 100)}%
              </div>
            </div>
            
            <div className="result-message">
              {score === 5 && (
                <div className="excellent-result">
                  <span className="result-icon">🏆</span>
                  <h3>Excellent! Perfect Score!</h3>
                  <p>You're a math genius! 🎉</p>
                </div>
              )}
              {score >= 3 && score < 5 && (
                <div className="good-result">
                  <span className="result-icon">⭐</span>
                  <h3>Great Job!</h3>
                  <p>You have solid math skills! 👍</p>
                </div>
              )}
              {score < 3 && (
                <div className="average-result">
                  <span className="result-icon">📚</span>
                  <h3>Good Attempt!</h3>
                  <p>Keep practicing to improve! 💪</p>
                </div>
              )}
            </div>
            
            <div className="time-result">
              <strong>Time Remaining:</strong> {formatTime(timeLeft)}
            </div>
            
            <div className="result-actions">
              <button className="btn-primary" onClick={restartQuiz}>
                Play Again
              </button>
              <button className="btn-secondary" onClick={onClose}>
                Back to Games
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="math-challenge-modal">
      <div className="math-challenge-content glass-card">
        <div className="quiz-header">
          <div className="quiz-info">
            <h2>🧮 Math Challenge</h2>
            <div className="quiz-progress">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>
          <div className="quiz-stats">
            <div className="time-display">
              ⏱️ {formatTime(timeLeft)}
            </div>
            <div className="score-display-mini">
              Score: {score}
            </div>
            <button className="close-btn" onClick={onClose}>✕</button>
          </div>
        </div>
        
        {questions.length > 0 && (
          <div className="question-content">
            <div className="question-header">
              <span className="question-type">
                {questions[currentQuestion].type}
              </span>
              <h3 className="question-text">
                {questions[currentQuestion].question}
              </h3>
            </div>
            
            <div className="options-grid">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`option-btn ${
                    selectedAnswer === option ? 'selected' : ''
                  }`}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={selectedAnswer !== null}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="option-value">{option}</span>
                </button>
              ))}
            </div>
            
            <div className="quiz-actions">
              <button
                className="btn-primary next-btn"
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
              >
                {currentQuestion + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>
            
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MathChallenge;