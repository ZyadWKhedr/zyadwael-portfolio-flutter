import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Trophy, Minus, Skull, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchGameTotals, recordPlay, type GameTotals } from '@/lib/gameStats';

type Player = 'X' | 'O' | null;
type Board = Player[];

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
      if (score > best) { best = score; move = i; }
    }
  }
  return move;
}

const TicTacToeGame = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [totals, setTotals] = useState<GameTotals>({ total: 0, wins: 0, losses: 0, draws: 0, topScore: 0 });
  const [resultAnim, setResultAnim] = useState<string | null>(null);
  const recordedRef = useRef(false);
  const human: Player = 'X';
  const ai: Player = 'O';

  const { winner, line } = checkWinner(board);
  const gameOver = winner !== null;

  useEffect(() => { fetchGameTotals('tictactoe').then(setTotals); }, []);

  useEffect(() => {
    if (!gameOver || recordedRef.current) return;
    recordedRef.current = true;
    const result = winner === human ? 'win' : winner === ai ? 'loss' : 'draw';
    setResultAnim(result);
    recordPlay('tictactoe', result).then(() => fetchGameTotals('tictactoe').then(setTotals));
    const t = setTimeout(() => setResultAnim(null), 1200);
    return () => clearTimeout(t);
  }, [gameOver, winner]);

  const reset = useCallback(() => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    recordedRef.current = false;
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
    : winner === human ? 'You win!'
    : winner === ai ? 'AI wins!'
    : isPlayerTurn ? 'Your turn (X)' : 'AI thinking…';

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="grid grid-cols-4 gap-2 w-full">
        {[
          { label: 'Total', value: totals.total, Icon: Gamepad2, color: 'text-flutter-light-blue', bg: 'bg-flutter-light-blue/10', border: 'border-flutter-light-blue/20', key: 'total' },
          { label: 'Wins',  value: totals.wins,  Icon: Trophy,   color: 'text-emerald-400',        bg: 'bg-emerald-500/10',        border: 'border-emerald-500/20',        key: 'win' },
          { label: 'Draws', value: totals.draws, Icon: Minus,    color: 'text-amber-400',          bg: 'bg-amber-500/10',          border: 'border-amber-500/20',          key: 'draw' },
          { label: 'Losses',value: totals.losses,Icon: Skull,    color: 'text-rose-400',           bg: 'bg-rose-500/10',           border: 'border-rose-500/20',           key: 'loss' },
        ].map(({ label, value, Icon, color, bg, border, key }) => (
          <motion.div
            key={label}
            animate={resultAnim && (key === resultAnim || key === 'total') ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.4 }}
            className={`flex flex-col items-center py-2 rounded-xl border ${border} ${bg} backdrop-blur-sm`}
          >
            <Icon className={`w-3.5 h-3.5 ${color} mb-0.5`} />
            <span className={`text-lg font-bold ${color} leading-none`}>{value}</span>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 mt-0.5">{label}</span>
          </motion.div>
        ))}
      </div>

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
