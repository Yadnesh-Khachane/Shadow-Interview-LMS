import React, { useState } from 'react';
import MathChallenge from './MathChallenge';
import './EducationalGames.css';

const EducationalGames = () => {
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    {
      id: 1,
      name: "Math Challenge",
      icon: "🧮",
      description: "Solve math problems against the clock",
      color: "#2c5aa0"
    },
    {
      id: 2,
      name: "Code Master",
      icon: "💻",
      description: "Learn programming concepts through puzzles",
      color: "#28a745"
    },
    {
      id: 3,
      name: "Word Wizard",
      icon: "📚",
      description: "Expand your vocabulary with word games",
      color: "#45B7D1"
    },
    {
      id: 4,
      name: "Science Quiz",
      icon: "🔬",
      description: "Test your science knowledge",
      color: "#96CEB4"
    },
    {
      id: 5,
      name: "Memory Match",
      icon: "🎴",
      description: "Improve your memory with matching games",
      color: "#FECA57"
    },
    {
      id: 6,
      name: "Logic Puzzles",
      icon: "🧩",
      description: "Challenge your logical thinking",
      color: "#FF9FF3"
    }
  ];

  const startGame = (gameId) => {
    setActiveGame(gameId);
  };

  const closeGame = () => {
    setActiveGame(null);
  };

  const GameCard = ({ game }) => (
    <div 
      className="game-card glass-card fade-in"
      style={{ '--game-color': game.color }}
      onClick={() => startGame(game.id)}
    >
      <div className="game-icon">{game.icon}</div>
      <h3>{game.name}</h3>
      <p>{game.description}</p>
      <div className="game-play-btn">
        Play Now
      </div>
    </div>
  );

  const renderActiveGame = () => {
    switch (activeGame) {
      case 1:
        return <MathChallenge onClose={closeGame} />;
      // Add other games here when implemented
      default:
        return null;
    }
  };

  return (
    <div className="games-container">
      <div className="games-header fade-in">
        <h1>Learning Games 🎮</h1>
        <p>Learn while having fun with these educational games!</p>
      </div>

      <div className="games-grid">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {activeGame && renderActiveGame()}
    </div>
  );
};

export default EducationalGames;