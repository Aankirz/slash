import React from 'react';

const Keyboard = ({ onKeyPress, keyStatus }) => {
  const rows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace']
  ];
  
  // Status colors
  const statusColors = {
    correct: 'bg-green-600 text-white border-green-700',
    present: 'bg-yellow-500 text-white border-yellow-600',
    absent: 'bg-gray-600 text-white border-gray-700',
    unused: 'bg-gray-400 text-gray-900 border-gray-500'
  };
  
  const handleClick = (key) => {
    onKeyPress(key);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2 gap-1">
          {row.map((key) => {
            const status = key === 'Enter' || key === 'Backspace' 
              ? 'unused' 
              : (keyStatus[key.toLowerCase()] || 'unused');
            
            return (
              <button
                key={key}
                onClick={() => handleClick(key)}
                className={`
                  ${key === 'Enter' || key === 'Backspace' ? 'px-3 min-w-[60px]' : 'px-2 min-w-[40px]'}
                  py-4 
                  font-bold 
                  rounded 
                  transition-all
                  border-2
                  ${statusColors[status]}
                  ${key === 'Enter' || key === 'Backspace' ? 'text-sm' : 'text-lg uppercase'}
                `}
              >
                {key === 'Backspace' ? '⌫' : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard; 