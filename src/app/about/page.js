import React from 'react';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <div className="flex justify-between items-center mb-6">
            <Link href="/" className="text-white hover:text-blue-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            
            <h1 className="text-3xl font-bold text-center text-white">About WordPuzzle</h1>
            
            <div className="w-6"></div> {/* Empty div for alignment */}
          </div>
          
          <div className="text-white space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-3">What is WordPuzzle?</h2>
              <p className="leading-relaxed">
                WordPuzzle is a challenging word guessing game where you try to discover a hidden 5-letter word. 
                Each day brings a new challenge, and you can also practice with unlimited puzzles in Practice Mode.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-3">How to Play</h2>
              <ol className="list-decimal list-inside space-y-2 leading-relaxed">
                <li>You have 6 attempts to guess the hidden 5-letter word.</li>
                <li>Each guess must be a valid 5-letter word.</li>
                <li>After each guess, the color of the tiles will change to show how close your guess was:</li>
                <ul className="list-inside space-y-2 ml-8 mt-2">
                  <li className="flex items-center">
                    <span className="w-5 h-5 inline-block bg-green-600 mr-2 rounded"></span>
                    <span>Green means the letter is correct and in the right position.</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 inline-block bg-yellow-500 mr-2 rounded"></span>
                    <span>Yellow means the letter is in the word but in the wrong position.</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 inline-block bg-gray-600 mr-2 rounded"></span>
                    <span>Gray means the letter is not in the word.</span>
                  </li>
                </ul>
              </ol>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-3">Game Modes</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-semibold text-blue-300">Daily Challenge</h3>
                  <p className="leading-relaxed">
                    Every day a new word is revealed. All players get the same word, so you can compare your results with friends!
                    Your progress is saved, so you can continue where you left off.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-purple-300">Practice Mode</h3>
                  <p className="leading-relaxed">
                    Play as many puzzles as you want with random words. Perfect for improving your skills and strategies.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-3">Hints</h2>
              <p className="leading-relaxed">
                Stuck on a difficult word? You can use up to 3 hints per game. Each hint will reveal a letter in the correct position.
                Use them wisely, as using hints will lower your final score!
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-3">Scoring</h2>
              <p className="leading-relaxed">
                Your score is calculated based on how many attempts you used and how many hints you needed.
                The fewer attempts and hints used, the higher your score will be!
              </p>
            </section>
          </div>
        </div>
        
        <div className="text-center">
          <Link 
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-bold transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 