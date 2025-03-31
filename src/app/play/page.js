'use client';

import React, { useState, useEffect, useCallback } from 'react';
import WordGrid from '@/components/WordGrid';
import Keyboard from '@/components/Keyboard';
import GameHeader from '@/components/GameHeader';
import GameResult from '@/components/GameResult';
import { getDailyWord, evaluateGuess, isValidWord, getKeyboardStatus, getHint } from '@/utils/wordUtils';

export default function PlayDaily() {
  const MAX_ATTEMPTS = 6;
  const WORD_LENGTH = 5;
  const MAX_HINTS = 3;
  
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [keyStatus, setKeyStatus] = useState({});
  const [gameState, setGameState] = useState('playing'); // playing, won, lost
  const [message, setMessage] = useState('');
  const [hintsUsed, setHintsUsed] = useState(0);
  const [usedHintIndices, setUsedHintIndices] = useState([]);
  
  // Initialize the game
  useEffect(() => {
    const dailyWord = getDailyWord();
    setTargetWord(dailyWord);
    
    // Check localStorage for saved game state
    const savedState = localStorage.getItem('dailyGameState');
    if (savedState) {
      const { date, guesses, gameState, hintsUsed, usedHintIndices } = JSON.parse(savedState);
      
      // Only restore if it's from today
      const today = new Date().toDateString();
      if (date === today) {
        setGuesses(guesses);
        setGameState(gameState);
        setHintsUsed(hintsUsed);
        setUsedHintIndices(usedHintIndices);
        
        // Update keyboard status
        const status = getKeyboardStatus(guesses, dailyWord);
        setKeyStatus(status);
      } else {
        // New day, clear saved state
        localStorage.removeItem('dailyGameState');
      }
    }
  }, []);
  
  // Save game state to localStorage
  useEffect(() => {
    if (targetWord) {
      const gameData = {
        date: new Date().toDateString(),
        guesses,
        gameState,
        hintsUsed,
        usedHintIndices
      };
      localStorage.setItem('dailyGameState', JSON.stringify(gameData));
    }
  }, [guesses, gameState, targetWord, hintsUsed, usedHintIndices]);
  
  const handleKeyPress = useCallback((key) => {
    if (gameState !== 'playing') return;
    
    setMessage('');
    
    if (key === 'Enter') {
      // Submit guess
      if (currentGuess.length !== WORD_LENGTH) {
        setMessage(`Word must be ${WORD_LENGTH} letters long`);
        return;
      }
      
      if (!isValidWord(currentGuess)) {
        setMessage('Not a valid word');
        return;
      }
      
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      setCurrentGuess('');
      
      // Update keyboard status
      const status = getKeyboardStatus(newGuesses, targetWord);
      setKeyStatus(status);
      
      // Check if won or lost
      if (currentGuess.toLowerCase() === targetWord.toLowerCase()) {
        setGameState('won');
      } else if (newGuesses.length >= MAX_ATTEMPTS) {
        setGameState('lost');
      }
    } else if (key === 'Backspace') {
      // Delete last character
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(key)) {
      // Add letter if not at max length
      if (currentGuess.length < WORD_LENGTH) {
        setCurrentGuess(currentGuess + key.toLowerCase());
      }
    }
  }, [currentGuess, gameState, guesses, targetWord]);
  
  // Listen for keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleKeyPress('Enter');
      } else if (e.key === 'Backspace') {
        handleKeyPress('Backspace');
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyPress(e.key);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyPress]);
  
  const getHintHandler = () => {
    if (hintsUsed >= MAX_HINTS || gameState !== 'playing') return;
    
    const hint = getHint(targetWord, usedHintIndices);
    if (hint) {
      setHintsUsed(prev => prev + 1);
      setUsedHintIndices(prev => [...prev, hint.index]);
      
      // Add the letter to the current guess
      let newGuess = currentGuess.split('');
      newGuess[hint.index] = hint.letter;
      setCurrentGuess(newGuess.join(''));
      
      setMessage(`Hint: Letter ${hint.index + 1} is "${hint.letter.toUpperCase()}"`);
    }
  };
  
  const resetGame = () => {
    // For practice mode only
    const newWord = getDailyWord(); // In a real app, you'd get a new word
    setTargetWord(newWord);
    setGuesses([]);
    setCurrentGuess('');
    setKeyStatus({});
    setGameState('playing');
    setMessage('');
    setHintsUsed(0);
    setUsedHintIndices([]);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 p-4">
      <div className="max-w-3xl mx-auto">
        <GameHeader 
          mode="daily" 
          hintsUsed={hintsUsed} 
          hintsAvailable={MAX_HINTS} 
        />
        
        {message && (
          <div className="bg-gray-800 text-white p-3 rounded-lg mb-4 text-center">
            {message}
          </div>
        )}
        
        <WordGrid 
          guesses={guesses} 
          currentGuess={currentGuess} 
          targetWord={targetWord} 
          maxAttempts={MAX_ATTEMPTS} 
          maxLength={WORD_LENGTH} 
        />
        
        <div className="flex justify-center mb-6">
          <button 
            onClick={getHintHandler}
            disabled={hintsUsed >= MAX_HINTS || gameState !== 'playing'}
            className={`px-4 py-2 rounded-lg font-bold ${
              hintsUsed >= MAX_HINTS || gameState !== 'playing'
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white transition-colors`}
          >
            Get Hint ({MAX_HINTS - hintsUsed} left)
          </button>
        </div>
        
        <Keyboard onKeyPress={handleKeyPress} keyStatus={keyStatus} />
        
        {gameState !== 'playing' && (
          <GameResult 
            targetWord={targetWord}
            won={gameState === 'won'}
            attempts={guesses.length}
            maxAttempts={MAX_ATTEMPTS}
            hintsUsed={hintsUsed}
            onPlayAgain={resetGame}
          />
        )}
      </div>
    </div>
  );
} 