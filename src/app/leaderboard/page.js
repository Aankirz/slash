'use client';

import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function Leaderboard() {
  // In a real app, this would come from a database
  const leaderboardData = [
    { id: 1, name: 'Player1', score: 95, date: new Date(2023, 5, 15) },
    { id: 2, name: 'Player2', score: 90, date: new Date(2023, 5, 14) },
    { id: 3, name: 'Player3', score: 88, date: new Date(2023, 5, 15) },
    { id: 4, name: 'Player4', score: 85, date: new Date(2023, 5, 13) },
    { id: 5, name: 'Player5', score: 82, date: new Date(2023, 5, 15) },
    { id: 6, name: 'Player6', score: 80, date: new Date(2023, 5, 14) },
    { id: 7, name: 'Player7', score: 78, date: new Date(2023, 5, 12) },
    { id: 8, name: 'Player8', score: 75, date: new Date(2023, 5, 15) },
    { id: 9, name: 'Player9', score: 72, date: new Date(2023, 5, 13) },
    { id: 10, name: 'Player10', score: 70, date: new Date(2023, 5, 14) },
  ];

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
            
            <h1 className="text-3xl font-bold text-center text-white">Leaderboard</h1>
            
            <div className="w-6"></div> {/* Empty div for alignment */}
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-3 text-left">Rank</th>
                  <th className="px-4 py-3 text-left">Player</th>
                  <th className="px-4 py-3 text-left">Score</th>
                  <th className="px-4 py-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((player, index) => (
                  <tr 
                    key={player.id} 
                    className={`border-b border-gray-700 ${index < 3 ? 'bg-gray-700/30' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        {index === 0 && (
                          <span className="text-yellow-400 mr-1">🏆</span>
                        )}
                        {index === 1 && (
                          <span className="text-gray-300 mr-1">🥈</span>
                        )}
                        {index === 2 && (
                          <span className="text-amber-700 mr-1">🥉</span>
                        )}
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-4 py-3">{player.name}</td>
                    <td className="px-4 py-3">{player.score}</td>
                    <td className="px-4 py-3">{format(player.date, 'MMM d, yyyy')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-white mb-4">Play today's challenge to get on the leaderboard!</p>
          <Link 
            href="/play"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-bold transition-colors"
          >
            Play Today's Challenge
          </Link>
        </div>
      </div>
    </div>
  );
} 