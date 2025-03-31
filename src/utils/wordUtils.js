import { format } from 'date-fns';

// Sample word list (in a real app, you would use a much larger word list)
const wordList = [
  'apple', 'baker', 'charm', 'dream', 'eager', 
  'flare', 'glory', 'house', 'ideal', 'jolly',
  'knife', 'lemon', 'music', 'novel', 'ocean', 
  'piano', 'quiet', 'royal', 'sugar', 'tenor',
  'unity', 'vivid', 'water', 'xenon', 'young', 'zebra'
];

// Get daily word based on the date
export function getDailyWord() {
  const today = new Date();
  const dateString = format(today, 'yyyyMMdd');
  const dateAsNumber = parseInt(dateString);
  
  // Use the date to determine which word to use
  const wordIndex = dateAsNumber % wordList.length;
  return wordList[wordIndex];
}

// Get a random word for practice mode
export function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
}

// Evaluate a guess against the target word
export function evaluateGuess(guess, targetWord) {
  const result = [];
  const targetLetters = targetWord.split('');
  
  // First pass: Find exact matches (green)
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === targetWord[i]) {
      result[i] = { letter: guess[i], status: 'correct' }; // Green
      targetLetters[i] = null; // Mark as used
    } else {
      result[i] = { letter: guess[i], status: 'absent' }; // Default to gray
    }
  }
  
  // Second pass: Find letters in word but wrong position (yellow)
  for (let i = 0; i < guess.length; i++) {
    if (result[i].status !== 'correct') { // Skip already correct letters
      const indexInTarget = targetLetters.indexOf(guess[i]);
      if (indexInTarget !== -1) {
        result[i].status = 'present'; // Yellow
        targetLetters[indexInTarget] = null; // Mark as used
      }
    }
  }
  
  return result;
}

// Check if guess is a valid word (in the word list)
export function isValidWord(word) {
  return wordList.includes(word.toLowerCase());
}

// Get keyboard letter status after guesses
export function getKeyboardStatus(guesses, targetWord) {
  const keyStatus = {};
  
  // Initialize all letters to unused
  'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
    keyStatus[letter] = 'unused';
  });
  
  // Update based on guesses
  guesses.forEach(guess => {
    const evaluation = evaluateGuess(guess, targetWord);
    evaluation.forEach(({ letter, status }) => {
      const lowerLetter = letter.toLowerCase();
      // Only upgrade status, never downgrade
      if (status === 'correct') {
        keyStatus[lowerLetter] = 'correct';
      } else if (status === 'present' && keyStatus[lowerLetter] !== 'correct') {
        keyStatus[lowerLetter] = 'present';
      } else if (status === 'absent' && keyStatus[lowerLetter] !== 'correct' && keyStatus[lowerLetter] !== 'present') {
        keyStatus[lowerLetter] = 'absent';
      }
    });
  });
  
  return keyStatus;
}

// Get a hint for the current word
export function getHint(targetWord, usedHints) {
  // Reveal a letter not yet revealed
  const letters = targetWord.split('');
  const availableIndices = letters.map((_, index) => index).filter(index => !usedHints.includes(index));
  
  if (availableIndices.length === 0) return null;
  
  const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
  return {
    index: randomIndex,
    letter: letters[randomIndex]
  };
} 