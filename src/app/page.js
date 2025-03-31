import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-blue-900 to-purple-900 text-white">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-6xl font-bold mb-8">WordPuzzle</h1>
        <p className="text-xl mb-12">Challenge your vocabulary with daily word puzzles!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:bg-white/20 transition-all">
            <h2 className="text-2xl font-bold mb-4">Daily Challenge</h2>
            <p className="mb-6">Solve today's puzzle and compete with others!</p>
            <Link 
              href="/play" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Play Today's Puzzle
            </Link>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:bg-white/20 transition-all">
            <h2 className="text-2xl font-bold mb-4">Practice Mode</h2>
            <p className="mb-6">Sharpen your skills with unlimited puzzles!</p>
            <Link 
              href="/practice" 
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Practice Mode
            </Link>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg mb-12">
          <h2 className="text-2xl font-bold mb-4">How to Play</h2>
          <ul className="text-left list-disc list-inside mb-6">
            <li className="mb-2">Try to guess the hidden word within 6 attempts</li>
            <li className="mb-2">Each guess must be a valid 5-letter word</li>
            <li className="mb-2">After each guess, the color of tiles will change to show how close your guess was</li>
            <li className="mb-2">Green means the letter is correct and in the right position</li>
            <li className="mb-2">Yellow means the letter is in the word but in the wrong position</li>
            <li className="mb-2">Gray means the letter is not in the word</li>
          </ul>
        </div>
        
        <div className="flex justify-center space-x-4">
          <Link 
            href="/leaderboard" 
            className="text-white/80 hover:text-white hover:underline transition-colors"
          >
            Leaderboard
          </Link>
          <Link 
            href="/about" 
            className="text-white/80 hover:text-white hover:underline transition-colors"
          >
            About
          </Link>
        </div>
      </div>
    </main>
  );
}
