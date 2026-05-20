import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Trophy, Minus, Skull } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Player = 'X' | 'O' | null;
type Board = Player[];
type Stats = { wins: number; draws: number; losses: number };

const WINS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function checkWinner(b: Board): { winner: Player | 'draw' | null; line: number[] | null } {
  for (const line of WINS) {
    const [a, b1, c] = line;
    if (b[a] && b[a] === b[b1] && b[a] === b[c]) return { winner: b[a], line };
  }
  if (b.every(Boolean)) return { winner: 'draw', line: null };
  return { winner: null, line: null };
}

function minimax(board: Board, isMax: boolean, ai: Player, human: Player): number {
  const { winner } = checkWinner(board);
  if (winner === ai) return 10;
  if (winner === human) return -10;
  if (winner === 'draw') return 0;

  let best = isMax ? -Infinity : Infinity;
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = isMax ? ai : human;
      const score = minimax(board, !isMax, ai, human);
      board[i] = null;
      best = isMax ? Math.max(best, score) : Math.min(best, score);
    }
  }
  return best;
}

function bestMove(board: Board, ai: Player, human: Player): number {
  let best = -Infinity;
  let move = -1;
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = ai;
      const score = minimax(board, false, ai, human);
      board[i] = null;
      if (score > best) {
        best = score;
        move = i;
      }
    }
  }
  return move;
}

const STORAGE_KEY = 'ttt-stats';

function loadStats(): Stats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* empty */ }
  return { wins: 0, draws: 0, losses: 0 };
}

function saveStats(s: Stats) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch { /* empty */ }
}

const TicTacToeGame = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [stats, setStats] = useState<Stats>(loadStats);
  const [resultAnim, setResultAnim] = useState<string | null>(null);
  const human: Player = 'X';
  const ai: Player = 'O';

  const { winner, line } = checkWinner(board);
  const gameOver = winner !== null;

  useEffect(() => {
    if (!gameOver) return;
    if (winner === human) {
      setStats((prev) => { const next = { ...prev, wins: prev.wins + 1 }; saveStats(next); setResultAnim('win'); return next; });
    } else if (winner === ai) {
      setStats((prev) => { const next = { ...prev, losses: prev.losses + 1 }; saveStats(next); setResultAnim('loss'); return next; });
    } else if (winner === 'draw') {
      setStats((prev) => { const next = { ...prev, draws: prev.draws + 1 }; saveStats(next); setResultAnim('draw'); return next; });
    }
    const t = setTimeout(() => setResultAnim(null), 1200);
    return () => clearTimeout(t);
  }, [gameOver, winner]);

  const reset = useCallback(() => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
  }, []);

  const handleClick = (i: number) => {
    if (board[i] || gameOver || !isPlayerTurn) return;
    const next = [...board];
    next[i] = human;
    setBoard(next);
    setIsPlayerTurn(false);
  };

  useEffect(() => {
    if (!isPlayerTurn && !gameOver) {
      const t = setTimeout(() => {
        const move = bestMove([...board], ai, human);
        if (move !== -1) {
          const next = [...board];
          next[move] = ai;
          setBoard(next);
          setIsPlayerTurn(true);
        }
      }, 450);
      return () => clearTimeout(t);
    }
  }, [isPlayerTurn, gameOver, board]);

  const status = winner === 'draw'
    ? "It's a draw!"
    : winner === human
      ? 'You win!'
      : winner === ai
        ? 'AI wins!'
        : isPlayerTurn ? 'Your turn (X)' : 'AI thinking…';

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="text-center">
        <p className="text-xs uppercase tracking-widest text-flutter-light-blue/70">Tic Tac Toe</p>
        <p className="text-sm font-medium text-white mt-1 min-h-[1.25rem]">{status}</p>
      </div>

      <div className="grid grid-cols-3 gap-2 w-full aspect-square">
        {board.map((cell, i) => {
          const isWin = line?.includes(i);
          return (
            <motion.button
              key={i}
              onClick={() => handleClick(i)}
              whileTap={{ scale: 0.92 }}
              className={`relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm
                flex items-center justify-center text-3xl font-bold transition-colors
                ${!cell && isPlayerTurn && !gameOver ? 'hover:bg-white/10 cursor-pointer' : 'cursor-default'}
                ${isWin ? 'bg-flutter-teal/30 border-flutter-teal' : ''}`}
            >
              <AnimatePresence>
                {cell && (
                  <motion.span
                    key={cell}
                    initial={{ scale: 0, rotate: -90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                    className={cell === 'X' ? 'text-flutter-light-blue' : 'text-flutter-teal'}
                  >
                    {cell}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      <Button
        onClick={reset}
        variant="outline"
        size="sm"
        className="mt-2 border-white/20 bg-white/5 hover:bg-white/10 text-white gap-2"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        New Game
      </Button>
    </div>
  );
};

export default TicTacToeGame;
