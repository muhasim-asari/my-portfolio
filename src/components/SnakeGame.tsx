// components/SnakeGame.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Grid Configuration
const GRID_SIZE = 20;
const INITIAL_SNAKE = [[10, 10]];
const INITIAL_DIRECTION = [0, -1]; // Moving Up
const SPEED = 150; // Speed in ms

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState([5, 5]);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);

  // Load Highscore from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('snake_highscore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  // Update Highscore
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snake_highscore', score.toString());
    }
  }, [score, highScore]);

  // Game Loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = setInterval(() => {
      setSnake((prevSnake) => {
        const newHead = [prevSnake[0][0] + direction[0], prevSnake[0][1] + direction[1]];

        // 1. Check Wall Collision
        if (
          newHead[0] < 0 || 
          newHead[0] >= GRID_SIZE || 
          newHead[1] < 0 || 
          newHead[1] >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // 2. Check Self Collision
        for (const segment of prevSnake) {
          if (newHead[0] === segment[0] && newHead[1] === segment[1]) {
            setGameOver(true);
            return prevSnake;
          }
        }

        const newSnake = [newHead, ...prevSnake];

        // 3. Check Food
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setScore(s => s + 1);
          // Spawn random food
          let newFood;
          do {
             newFood = [
               Math.floor(Math.random() * GRID_SIZE),
               Math.floor(Math.random() * GRID_SIZE)
             ];
          } while (checkCollision(newFood, newSnake)); // Ensure food doesn't spawn on snake body
          setFood(newFood);
        } else {
          newSnake.pop(); // Remove tail if not eating
        }

        return newSnake;
      });
    }, SPEED);

    return () => clearInterval(moveSnake);
  }, [isPlaying, gameOver, direction, food]);

  // Helper: Check collision for spawning food
  const checkCollision = (pos: number[], snakeBody: number[][]) => {
     return snakeBody.some(segment => segment[0] === pos[0] && segment[1] === pos[1]);
  }

  // Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      
      // Prevent scrolling when playing
      if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
          e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowUp': if (direction[1] !== 1) setDirection([0, -1]); break;
        case 'ArrowDown': if (direction[1] !== -1) setDirection([0, 1]); break;
        case 'ArrowLeft': if (direction[0] !== 1) setDirection([-1, 0]); break;
        case 'ArrowRight': if (direction[0] !== -1) setDirection([1, 0]); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, isPlaying]);

  // Reset Function
  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection([0, -1]);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    gameAreaRef.current?.focus();
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-secondary border-2 border-white shadow-hard max-w-md mx-auto relative">
      
      {/* Header Gameboy Style */}
      <div className="w-full flex justify-between items-end mb-4 border-b-2 border-black pb-2">
         <h3 className="font-syne text-2xl font-bold uppercase text-white">SNAKE<span className="text-primary">.EXE</span></h3>
         <div className="text-right font-mono text-xs text-gray-400">
            <p>SCORE: <span className="text-white font-bold text-lg">{score}</span></p>
            <p>HIGH: <span className="text-primary">{highScore}</span></p>
         </div>
      </div>

      {/* Game Area */}
      <div 
        ref={gameAreaRef}
        className="relative bg-black border-2 border-white/20"
        style={{ 
           width: '300px', 
           height: '300px',
           display: 'grid',
           gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
           gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
        }}
      >
        {/* Render Grid Cells */}
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
           const x = i % GRID_SIZE;
           const y = Math.floor(i / GRID_SIZE);
           
           const isSnake = snake.some(s => s[0] === x && s[1] === y);
           const isHead = snake[0][0] === x && snake[0][1] === y;
           const isFood = food[0] === x && food[1] === y;

           return (
             <div key={i} className="relative w-full h-full">
                {isSnake && (
                   <div className={`absolute inset-0 m-[1px] ${isHead ? 'bg-white' : 'bg-primary'} rounded-sm`}></div>
                )}
                {isFood && (
                   <div className="absolute inset-0 m-[2px] bg-red-500 rounded-full animate-pulse"></div>
                )}
             </div>
           )
        })}

        {/* Overlay Start / Game Over */}
        {(!isPlaying || gameOver) && (
           <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center z-10 backdrop-blur-sm">
              <h4 className="font-syne text-3xl font-bold text-white mb-2">
                 {gameOver ? "GAME OVER" : "READY?"}
              </h4>
              {gameOver && <p className="font-mono text-primary text-sm mb-4">Score: {score}</p>}
              
              <button 
                onClick={startGame}
                className="bg-primary text-black px-6 py-2 font-bold uppercase bg-[#FFF] hover:bg-white transition-colors border-2 border-black shadow-[4px_4px_0px_0px_#0066F7] active:translate-y-1 active:shadow-none"
              >
                 {gameOver ? "Try Again" : "Start Game"}
              </button>
              
              <p className="mt-4 font-mono text-[10px] text-gray-500">
                 Use Arrow Keys to Move
              </p>
           </div>
        )}
      </div>

      {/* Mobile Controls (D-Pad) */}
      <div className="mt-6 grid grid-cols-3 gap-2 md:hidden">
         <div></div>
         <button onClick={() => direction[1] !== 1 && setDirection([0, -1])} className="w-12 h-12 bg-[#333] border border-white/20 rounded flex items-center justify-center active:bg-primary">▲</button>
         <div></div>
         <button onClick={() => direction[0] !== 1 && setDirection([-1, 0])} className="w-12 h-12 bg-[#333] border border-white/20 rounded flex items-center justify-center active:bg-primary">◀</button>
         <button onClick={() => direction[1] !== -1 && setDirection([0, 1])} className="w-12 h-12 bg-[#333] border border-white/20 rounded flex items-center justify-center active:bg-primary">▼</button>
         <button onClick={() => direction[0] !== -1 && setDirection([1, 0])} className="w-12 h-12 bg-[#333] border border-white/20 rounded flex items-center justify-center active:bg-primary">▶</button>
      </div>

    </div>
  );
}