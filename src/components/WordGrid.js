import React from 'react';

const WordGrid = ({ guesses, currentGuess, targetWord, maxAttempts, maxLength }) => {
  // Create empty rows for the grid if needed
  const rows = [...guesses];
  
  // Add current guess as a row
  if (currentGuess) {
    rows.push(currentGuess);
  }
  
  // Add empty rows to fill the grid
  while (rows.length < maxAttempts) {
    rows.push('');
  }
  
  // Status colors
  const statusColors = {
    correct: 'bg-green-600 border-green-700',
    present: 'bg-yellow-500 border-yellow-600',
    absent: 'bg-gray-600 border-gray-700',
    empty: 'bg-gray-800 border-gray-700'
  };
  
  return (
    <div className="grid gap-2 mb-6">
      {rows.map((guess, rowIndex) => {
        // If this is a completed guess, evaluate it
        const isCompletedGuess = rowIndex < guesses.length;
        const evaluation = isCompletedGuess
          ? guess.split('').map((letter, i) => ({
              letter,
              status: letter === targetWord[i] ? 'correct' : (targetWord.includes(letter) ? 'present' : 'absent')
            }))
          : null;
          
        return (
          <div key={rowIndex} className="flex gap-2 justify-center">
            {Array.from({ length: maxLength }).map((_, colIndex) => {
              // Determine the letter to display
              let letter = '';
              let status = 'empty';
              
              if (rowIndex < guesses.length) {
                // Completed guess row with evaluation
                letter = evaluation[colIndex]?.letter || '';
                status = evaluation[colIndex]?.status || 'empty';
              } else if (rowIndex === guesses.length && colIndex < currentGuess.length) {
                // Current guess row
                letter = currentGuess[colIndex];
              }
              
              return (
                <div 
                  key={colIndex}
                  className={`flex items-center justify-center w-14 h-14 border-2 font-bold text-2xl uppercase transition-all duration-300 ${statusColors[status]}`}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default WordGrid; 