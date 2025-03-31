import React from 'react';
import Link from 'next/link';

const GameResult = ({ targetWord, won, attempts, maxAttempts, hintsUsed, onPlayAgain }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
        <h2 className={`text-3xl font-bold mb-4 text-center ${won ? 'text-green-500' : 'text-red-500'}`}>
          {won ? 'Congratulations!' : 'Game Over'}
        </h2>
        
        <div className="mb-6 text-center">
          <p className="text-lg mb-2">
            {won 
              ? `You found the word in ${attempts} ${attempts === 1 ? 'try' : 'tries'}!` 
              : 'Better luck next time!'}
          </p>
          
          <p className="text-xl font-bold mb-4">
            The word was: <span className="text-blue-400 uppercase">{targetWord}</span>
          </p>
          
          <div className="flex justify-center space-x-6 text-center mb-2">
            <div>
              <div className="text-2xl font-bold text-gray-200">{attempts}/{maxAttempts}</div>
              <div className="text-sm text-gray-400">Attempts</div>
            </div>
            
            <div>
              <div className="text-2xl font-bold text-gray-200">{hintsUsed}</div>
              <div className="text-sm text-gray-400">Hints Used</div>
            </div>
            
            <div>
              <div className="text-2xl font-bold text-gray-200">{Math.ceil((maxAttempts - attempts + (3 - hintsUsed)) * 100 / maxAttempts)}%</div>
              <div className="text-sm text-gray-400">Score</div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onPlayAgain}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-bold transition-colors"
          >
            Play Again
          </button>
          
          <Link
            href="/"
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-bold transition-colors text-center"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameResult; 