import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

const GameHeader = ({ mode, hintsUsed, hintsAvailable }) => {
  const today = new Date();
  const formattedDate = format(today, 'MMMM d, yyyy');
  
  return (
    <div className="w-full bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-white hover:text-blue-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        
        <h1 className="text-2xl font-bold text-center text-white">WordPuzzle</h1>
        
        <div className="w-6"></div> {/* Empty div for alignment */}
      </div>
      
      <div className="mt-2 flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-300 text-sm">{mode === 'daily' ? 'Daily Challenge' : 'Practice Mode'}</div>
        {mode === 'daily' && <div className="text-gray-300 text-sm">{formattedDate}</div>}
        
        <div className="flex items-center mt-2 md:mt-0">
          <div className="text-gray-300 text-sm mr-2">Hints:</div>
          <div className="flex">
            {Array.from({ length: hintsAvailable }).map((_, i) => (
              <div 
                key={i} 
                className={`w-3 h-3 rounded-full mx-1 ${i < hintsUsed ? 'bg-gray-500' : 'bg-blue-500'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHeader; 