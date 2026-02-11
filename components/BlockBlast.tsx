
import React, { useState, useEffect, useCallback } from 'react';
import { Shape } from '../types';
import { Button } from './UI';

interface BlockBlastProps {
  onComplete: () => void;
}

const SHAPES_POOL: Shape[] = [
  { id: 1, cells: [[1, 1, 1]], color: 'bg-[#00cfeb]' },
  { id: 2, cells: [[1, 1], [1, 1]], color: 'bg-[#c89b3c]' },
  { id: 3, cells: [[1], [1], [1], [1]], color: 'bg-[#00cfeb]' },
  { id: 4, cells: [[1, 1, 1], [0, 1, 0]], color: 'bg-purple-500' },
  { id: 5, cells: [[1, 0], [1, 1]], color: 'bg-[#00cfeb]' },
  { id: 6, cells: [[1, 1, 1], [1, 1, 1], [1, 1, 1]], color: 'bg-[#c89b3c]' },
];

const GRID_SIZE = 10;
const GOAL_SCORE = 500;

const BlockBlast: React.FC<BlockBlastProps> = ({ onComplete }) => {
  const [grid, setGrid] = useState<number[][]>(Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0)));
  const [score, setScore] = useState(0);
  const [hand, setHand] = useState<Shape[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const refreshHand = useCallback(() => {
    const newHand = Array(3).fill(null).map(() => ({
      ...SHAPES_POOL[Math.floor(Math.random() * SHAPES_POOL.length)],
      instanceId: Math.random()
    })) as any;
    setHand(newHand);
  }, []);

  useEffect(() => {
    refreshHand();
  }, [refreshHand]);

  const checkMatches = (currentGrid: number[][]) => {
    const rowsToClear: number[] = [];
    const colsToClear: number[] = [];
    const newGrid = currentGrid.map(row => [...row]);

    for (let r = 0; r < GRID_SIZE; r++) {
      if (newGrid[r].every(c => c === 1)) rowsToClear.push(r);
    }
    for (let c = 0; c < GRID_SIZE; c++) {
      let full = true;
      for (let r = 0; r < GRID_SIZE; r++) if (newGrid[r][c] === 0) full = false;
      if (full) colsToClear.push(c);
    }

    if (rowsToClear.length > 0 || colsToClear.length > 0) {
      rowsToClear.forEach(r => newGrid[r] = Array(GRID_SIZE).fill(0));
      colsToClear.forEach(c => {
        for (let r = 0; r < GRID_SIZE; r++) newGrid[r][c] = 0;
      });
      const lines = rowsToClear.length + colsToClear.length;
      setScore(s => s + (lines * 100));
      setGrid(newGrid);
    }
  };

  const checkGameOver = useCallback((currentGrid: number[][], currentHand: Shape[]) => {
    if (currentHand.length === 0) return false;
    const anyPieceFits = currentHand.some(shape => {
      for (let r = 0; r <= GRID_SIZE - shape.cells.length; r++) {
        for (let c = 0; c <= GRID_SIZE - shape.cells[0].length; c++) {
          let fits = true;
          shape.cells.forEach((row, dr) => {
            row.forEach((cell, dc) => {
              if (cell === 1 && currentGrid[r + dr][c + dc] === 1) fits = false;
            });
          });
          if (fits) return true;
        }
      }
      return false;
    });
    if (!anyPieceFits) setIsGameOver(true);
  }, []);

  const placePiece = (r: number, c: number) => {
    if (selectedIdx === null || isFinished) return;
    const shape = hand[selectedIdx];
    const canPlace = shape.cells.every((row, dr) => 
      row.every((cell, dc) => {
        if (cell === 0) return true;
        const nr = r + dr;
        const nc = c + dc;
        return nr < GRID_SIZE && nc < GRID_SIZE && grid[nr][nc] === 0;
      })
    );

    if (canPlace) {
      const newGrid = grid.map(row => [...row]);
      shape.cells.forEach((row, dr) => {
        row.forEach((cell, dc) => {
          if (cell === 1) newGrid[r + dr][c + dc] = 1;
        });
      });
      setGrid(newGrid);
      const newHand = hand.filter((_, i) => i !== selectedIdx);
      setHand(newHand);
      setSelectedIdx(null);
      setScore(s => s + 10);
      checkMatches(newGrid);
      if (newHand.length === 0) refreshHand();
      else checkGameOver(newGrid, newHand);
    }
  };

  useEffect(() => {
    if (score >= GOAL_SCORE) {
      setIsFinished(true);
      setTimeout(onComplete, 3000);
    }
  }, [score, onComplete]);

  const resetGame = () => {
    setGrid(Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0)));
    setScore(0);
    setIsGameOver(false);
    refreshHand();
  };

  return (
    <div className="flex flex-col items-center gap-6 animate-fadeIn relative">
      <div className="text-center">
        <h3 className="text-2xl font-lol text-[#c89b3c] mb-1 uppercase tracking-widest">BLOCK BLAST PRO</h3>
        <p className="text-sm text-blue-300 font-bold uppercase tracking-wider">Forge the Masterwork Key: {score} / {GOAL_SCORE}</p>
      </div>

      <div className="relative group p-4 border-4 border-[#c89b3c]/20 rounded-lg">
        <div className="grid grid-cols-10 gap-0.5 bg-[#091428]/90 p-2 rounded border-2 border-[#c89b3c] shadow-[0_0_30px_rgba(200,155,60,0.3)] backdrop-blur-sm">
          {grid.map((row, r) => row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              onClick={() => placePiece(r, c)}
              className={`w-7 h-7 sm:w-8 sm:h-8 border border-white/5 transition-all duration-300 ${
                cell === 1 ? 'bg-[#00cfeb] shadow-[inset_0_0_8px_rgba(255,255,255,0.5)]' : 'hover:bg-white/10 cursor-pointer'
              }`}
            />
          )))}
        </div>
        
        {isGameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-30 rounded backdrop-blur-md border-2 border-red-500/50">
            <h4 className="text-3xl font-lol text-red-500 mb-4 tracking-widest">DEFEAT</h4>
            <Button onClick={resetGame} variant="secondary">TRY AGAIN</Button>
          </div>
        )}

        {isFinished && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl rounded-lg border-2 border-[#c89b3c] z-40 animate-bounceIn">
             <div className="relative mb-6">
                <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full"></div>
                <img src="key.png" className="w-40 h-40 object-contain relative z-10 drop-shadow-[0_0_30px_#c89b3c]" style={{ mixBlendMode: 'screen' }} />
             </div>
             <h4 className="text-4xl font-lol text-[#c89b3c] tracking-[0.2em] animate-pulse">KEY FORGED</h4>
             <p className="text-sm text-yellow-400 font-bold uppercase mt-2 tracking-widest">Masterwork Protocol: Clear</p>
          </div>
        )}
      </div>

      <div className="flex gap-6 mt-4">
        {hand.map((shape, idx) => (
          <div
            key={(shape as any).instanceId}
            onClick={() => !isGameOver && !isFinished && setSelectedIdx(idx)}
            className={`p-3 border-2 rounded-lg cursor-pointer transition-all hover:scale-105 bg-[#091428] ${
              selectedIdx === idx ? 'border-[#00cfeb] shadow-[0_0_15px_rgba(0,207,235,0.5)] bg-blue-900/20' : 'border-[#c89b3c]/20 grayscale-[0.5]'
            }`}
          >
            <div className="flex flex-col gap-1">
              {shape.cells.map((row, ridx) => (
                <div key={ridx} className="flex gap-1">
                  {row.map((cell, cidx) => (
                    <div key={cidx} className={`w-3 h-3 rounded-sm ${cell === 1 ? shape.color : 'bg-transparent'}`} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockBlast;
