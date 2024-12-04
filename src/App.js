import React, { useEffect, useState } from 'react';
import { OpenFeatureProvider, useBooleanFlagValue, useStringFlagValue, OpenFeature } from '@openfeature/react-sdk';
import DevCycleProvider from '@devcycle/openfeature-web-provider';
import './App.css';
import RoomDisplay from './RoomDisplay';
import AnimatedQuestion from './AnimatedQuestion';
import { themeMapping, getQuestionsForTheme } from './utils/themeUtils';
import animatedQuestions from './questions/animatedQuestions';
import config from './config';

const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

function App() {
  const [isOpenFeatureReady, setIsOpenFeatureReady] = useState(false);

  useEffect(() => {
    const initializeOpenFeature = async () => {
      await OpenFeature.setContext({ user_id: userId });
      await OpenFeature.setProviderAndWait(new DevCycleProvider(config.DEVCYCLE_CLIENT_KEY));
      setIsOpenFeatureReady(true);
    };

    initializeOpenFeature();
  }, []);

  if (!isOpenFeatureReady) {
    return <div>Loading...</div>;
  }

  return (
      <OpenFeatureProvider>
        <AppContent />
      </OpenFeatureProvider>
  );
}

function AppContent() {
  const [questions, setQuestions] = useState([]);
  const [gameState, setGameState] = useState('idle');
  const [timeLeft, setTimeLeft] = useState(5);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [showThemeAnnouncement, setShowThemeAnnouncement] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  const isDarkTheme = useBooleanFlagValue('dark-theme', false);
  const gameTheme = useStringFlagValue('game-theme', 'autumnHarvest');
  const isDifficultyEnabled = useBooleanFlagValue('difficulty-hard', false);

  useEffect(() => {
    console.log('isDarkTheme:', isDarkTheme);
    console.log('Selected theme:', gameTheme);
    console.log('Difficulty enabled:', isDifficultyEnabled);
  }, [isDarkTheme, gameTheme, isDifficultyEnabled]);

  const nextLevel = () => {
    const nextLevelIndex = level; // Use the current level as the index for the next question
    const question = questions[nextLevelIndex - 1]; // Adjust for 0-based array index
    if (question) {
      console.log('Setting current image for level:', level);
      console.log('Image path:', question.imagePath);
      setCurrentImage(question.imagePath);
      setCurrentQuestion(question);
      setGameState('image');
      setTimeLeft(5);
    } else {
      // Handle game end
      handleGameOver(true);
    }
  };

  useEffect(() => {
    if (isDifficultyEnabled) {
      console.log('Difficulty mode enabled. Using animated questions.');
      setQuestions(animatedQuestions);
    } else if (gameTheme) {
      const themeQuestions = getQuestionsForTheme(gameTheme);
      setQuestions(themeQuestions);
      console.log('Theme questions set:', themeQuestions);
    }
  }, [gameTheme, isDifficultyEnabled]);

  useEffect(() => {
    console.log('Current level:', level);
    console.log('Current question:', currentQuestion);
  }, [level, currentQuestion]);

  useEffect(() => {
    let timer;
    if ((gameState === 'image' || gameState === 'mcq') && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (gameState === 'image') {
        setGameState('mcq');
        setTimeLeft(5); // Set 5 seconds for MCQ
      } else if (gameState === 'mcq') {
        // Time's up for MCQ, treat as wrong answer
        handleGameOver();
      }
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, level, questions]);

  const [showGameOver, setShowGameOver] = useState(false);
  const [gameResult, setGameResult] = useState(null);

  const handleGameOver = (isWin = false) => {
    setShowGameOver(true);
    setGameState('gameOver');
    setGameResult(isWin ? 'win' : 'lose');
  };

  const handleAnswer = (answerId) => {
    if (currentQuestion && answerId === currentQuestion.correctAnswer) {
      console.log('Correct answer!');
      setScore(prevScore => {
        const newScore = prevScore + 10;
        triggerAnimation('score');
        return newScore;
      });
      if (level < questions.length) {
        setLevel(prevLevel => {
          const newLevel = prevLevel + 1;
          console.log('Incrementing to level:', newLevel);
          triggerAnimation('level');
          return newLevel;
        });
      } else {
        // Player has completed all levels successfully
        handleGameOver(true);
      }
    } else {
      console.log('Incorrect answer.');
      handleGameOver(false);
    }
  };

  const triggerAnimation = (elementClass) => {
    const element = document.querySelector(`.${elementClass}`);
    element.classList.remove('pop-animation');
    void element.offsetWidth; // Trigger a reflow
    element.classList.add('pop-animation');
  };

  // Add a new useEffect to handle level changes
  useEffect(() => {
    if (level > 1) {
      console.log('Level changed, calling nextLevel');
      nextLevel();
    }
  }, [level]);

  const restartGame = () => {
    setShowGameOver(false);
    setGameState('idle');
    setLevel(1);
    setScore(0);
  };

  const startGame = () => {
    setLevel(1);  // Reset level when starting a new game
    setScore(0);  // Reset score
    if (isDifficultyEnabled) {
      nextLevel(); // Start the game immediately if difficulty mode is enabled
    } else {
      setShowThemeAnnouncement(true);
      setGameState('themeAnnouncement');
    }
  };

  useEffect(() => {
    let timer;
    if (gameState === 'themeAnnouncement' && !isDifficultyEnabled) {
      timer = setTimeout(() => {
        setShowThemeAnnouncement(false);
        nextLevel(); // This will set up the first question
      }, 3000); // Show theme announcement for 3 seconds
    }
    return () => clearTimeout(timer);
  }, [gameState, isDifficultyEnabled]);

  return (
      <div className={`App ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
        <header className="App-header">
          {gameState !== 'idle' && (
              <div className="game-info">
                <div className="level">Level: {level}</div>
                <div className="score">Score: {score}</div>
                <div className="time-left">Time: {timeLeft}s</div>
              </div>
          )}
        </header>
        <main className="App-main">
          {gameState === 'idle' && (
              <div className="welcome-screen">
                <div className="animated-blocks-container">
                  <div className="word memory">
                    <div className="letter">M</div>
                    <div className="letter">E</div>
                    <div className="letter">M</div>
                    <div className="letter">O</div>
                    <div className="letter">R</div>
                    <div className="letter">Y</div>
                  </div>
                  <div className="word maze">
                    <div className="letter">M</div>
                    <div className="letter">A</div>
                    <div className="letter">Z</div>
                    <div className="letter">E</div>
                  </div>
                </div>
                <div className="instructions animated-fade-in">
                  <h3>How to Play:</h3>
                  <ol>
                    <li className="animated-list-item">Click 'Start Game' to begin your journey.</li>
                    <li className="animated-list-item">Carefully observe the room and its contents.</li>
                    <li className="animated-list-item">Test your memory by answering questions about what you saw.</li>
                    <li className="animated-list-item">Progress through challenging levels as you sharpen your memory skills.</li>
                  </ol>
                </div>
                <button className="start-button animated-button" onClick={startGame}>Start Your Adventure!</button>
              </div>
          )}
          {showThemeAnnouncement && (
              <div
                  className="theme-announcement"
                  style={{backgroundColor: themeMapping[gameTheme]?.color || themeMapping.default.color}}
              >
                <h2>Welcome to the {themeMapping[gameTheme]?.name || themeMapping.default.name} theme!</h2>
                <p>Prepare to explore and memorize...</p>
              </div>
          )}
          {gameState === 'room' && (
              <RoomDisplay isDarkTheme={isDarkTheme} level={level}/>
          )}
          {gameState === 'image' && (
              isDifficultyEnabled ? (
                  <AnimatedQuestion questionId={currentQuestion.id} />
              ) : (
                  currentImage && (
                      <div className="image-display" style={{
                        backgroundColor: themeMapping[gameTheme]?.color || themeMapping.default.color,
                        margin: '20px auto',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        width: '90%',
                        maxWidth: '800px',
                        height: 'calc(100vh - 200px)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden'
                      }}>
                        <img
                            src={`${process.env.PUBLIC_URL}${currentImage}`}
                            alt={`${themeMapping[gameTheme]?.name || 'Theme'} Scene`}
                            style={{
                              maxWidth: '100%',
                              maxHeight: '100%',
                              objectFit: 'contain',
                              borderRadius: '5px'
                            }}
                            onError={(e) => {
                              console.error("Error loading image:", e);
                              e.target.onerror = null;
                              e.target.src = `${process.env.PUBLIC_URL}/images/placeholder.jpg`;
                            }}
                        />
                      </div>
                  )
              )
          )}
          {gameState === 'mcq' && currentQuestion && (
              <div className="question-section">
                <p className="question-text">{currentQuestion.question}</p>
                <div className="options">
                  {currentQuestion.options.map(option => (
                      <button
                          key={option.id}
                          onClick={() => handleAnswer(option.id)}
                          className="mcq-option"
                          data-option={option.id.toUpperCase()}
                      >
                        {option.text}
                      </button>
                  ))}
                </div>
              </div>
          )}
        </main>
        {showGameOver && (
            <div className="game-over-overlay">
              <div className="game-over-modal">
                {gameResult === 'win' && (
                    <img
                        src={`${process.env.PUBLIC_URL}/images/congratulations.jpg`}
                        alt="Congratulations"
                        className="congratulations-image"
                    />
                )}
                <h2>{gameResult === 'win' ? 'Congratulations!' : 'Game Over!'}</h2>
                <p>{gameResult === 'win' ? 'You completed all levels successfully!' : 'Better luck next time!'}</p>
                <p>Total Score: {score}</p>
                <button onClick={restartGame}>Play Again</button>
              </div>
            </div>
        )}
      </div>
  );
}

export default App;

console.log('Generated User ID:', userId);