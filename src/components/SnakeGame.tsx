import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Trophy, Gamepad2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchGameTotals, recordPlay, type GameTotals } from '@/lib/gameStats';

const SIZE = 12;
const TICK = 130;

type Cell = { x: number; y: number };
type Dir = 'up' | 'down' | 'left' | 'right';

const dirVec: Record<Dir, Cell> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const initial = (): { snake: Cell[]; dir: Dir } => ({
  snake: [
    { x: 6, y: 6 },
    { x: 5, y: 6 },
    { x: 4, y: 6 },
  ],
  dir: 'right',
});

function randFood(snake: Cell[]): Cell {
  while (true) {
    const c = { x: Math.floor(Math.random() * SIZE), y: Math.floor(Math.random() * SIZE) };
    if (!snake.some((s) => s.x === c.x && s.y === c.y)) return c;
  }
}

const SnakeGame = () => {
  const [{ snake, dir }, setState] = useState(initial);
  const [food, setFood] = useState<Cell>(() => randFood(initial().snake));
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [totals, setTotals] = useState<GameTotals>({ total: 0, wins: 0, losses: 0, draws: 0, topScore: 0 });
  const dirRef = useRef<Dir>('right');
  const recordedRef = useRef(false);

  useEffect(() => { dirRef.current = dir; }, [dir]);

  useEffect(() => {
    fetchGameTotals('snake').then(setTotals);
  }, []);

  const reset = useCallback(() => {
    const init = initial();
    setState(init);
    setFood(randFood(init.snake));
    setScore(0);
    setGameOver(false);
    setRunning(true);
    recordedRef.current = false;
  }, []);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const cur = dirRef.current;
      const map: Record<string, Dir> = {
        ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
        w: 'up', s: 'down', a: 'left', d: 'right',
      };
      const next = map[e.key];
      if (!next) return;
      const opp: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' };
      if (opp[cur] === next) return;
      setState((st) => ({ ...st, dir: next }));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Tick
  useEffect(() => {
    if (!running || gameOver) return;
    const id = setInterval(() => {
      setState((st) => {
        const head = st.snake[0];
        const v = dirVec[dirRef.current];
        const next: Cell = { x: head.x + v.x, y: head.y + v.y };

        // collisions
        if (
          next.x < 0 || next.y < 0 || next.x >= SIZE || next.y >= SIZE ||
          st.snake.some((s) => s.x === next.x && s.y === next.y)
        ) {
          setGameOver(true);
          setRunning(false);
          return st;
        }

        const ate = next.x === food.x && next.y === food.y;
        const newSnake = [next, ...st.snake];
        if (!ate) newSnake.pop();
        else {
          setScore((s) => s + 1);
          setFood(randFood(newSnake));
        }
        return { snake: newSnake, dir: st.dir };
      });
    }, TICK);
    return () => clearInterval(id);
  }, [running, gameOver, food]);

  // Record on game over
  useEffect(() => {
    if (!gameOver || recordedRef.current) return;
    recordedRef.current = true;
    recordPlay('snake', 'gameover', score).then(() => fetchGameTotals('snake').then(setTotals));
  }, [gameOver, score]);

  const dpadDir = (d: Dir) => () => {
    const opp: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' };
    if (opp[dirRef.current] === d) return;
    setState((st) => ({ ...st, dir: d }));
  };

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* Counters */}
      <div className="grid grid-cols-3 gap-2 w-full">
        {[
          { label: 'Score', value: score, Icon: Zap, color: 'text-flutter-light-blue', bg: 'bg-flutter-light-blue/10', border: 'border-flutter-light-blue/20' },
          { label: 'Top', value: Math.max(totals.topScore, score), Icon: Trophy, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
          { label: 'Plays', value: totals.total, Icon: Gamepad2, color: 'text-flutter-teal', bg: 'bg-flutter-teal/10', border: 'border-flutter-teal/20' },
        ].map(({ label, value, Icon, color, bg, border }) => (
          <div key={label} className={`flex flex-col items-center py-2 rounded-xl border ${border} ${bg} backdrop-blur-sm`}>
            <Icon className={`w-3.5 h-3.5 ${color} mb-0.5`} />
            <span className={`text-lg font-bold ${color} leading-none`}>{value}</span>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 mt-0.5">{label}</span>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-xs uppercase tracking-widest text-flutter-light-blue/70">Snake</p>
        <p className="text-sm font-medium text-white mt-1 min-h-[1.25rem]">
          {gameOver ? `Game Over — ${score} pts` : running ? `Eat the dots!` : 'Press play to start'}
        </p>
      </div>

      {/* Board */}
      <div
        className="relative w-full aspect-square rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(rgba(19,185,253,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(19,185,253,0.07) 1px, transparent 1px)',
          backgroundSize: `${100 / SIZE}% ${100 / SIZE}%`,
        }}
      >
        {/* Food */}
        <motion.div
          key={`${food.x}-${food.y}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute rounded-full bg-flutter-teal shadow-[0_0_8px_rgba(2,211,154,0.8)]"
          style={{
            width: `${100 / SIZE}%`,
            height: `${100 / SIZE}%`,
            left: `${(food.x * 100) / SIZE}%`,
            top: `${(food.y * 100) / SIZE}%`,
          }}
        />
        {/* Snake */}
        {snake.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-md"
            style={{
              width: `${100 / SIZE}%`,
              height: `${100 / SIZE}%`,
              left: `${(s.x * 100) / SIZE}%`,
              top: `${(s.y * 100) / SIZE}%`,
              background: i === 0
                ? 'linear-gradient(135deg, #13B9FD, #02D39A)'
                : `rgba(19,185,253,${Math.max(0.35, 1 - i * 0.05)})`,
              boxShadow: i === 0 ? '0 0 8px rgba(19,185,253,0.7)' : 'none',
            }}
          />
        ))}
        {!running && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <Button onClick={reset} className="bg-flutter-gradient gap-2"><Play className="w-4 h-4"/>Play</Button>
          </div>
        )}
        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Button onClick={reset} className="bg-flutter-gradient gap-2"><RotateCcw className="w-4 h-4"/>Play Again</Button>
          </div>
        )}
      </div>

      {/* D-pad for mobile */}
      <div className="grid grid-cols-3 gap-1 w-32 mt-1 select-none">
        <div />
        <button onClick={dpadDir('up')} className="aspect-square rounded-lg bg-white/5 border border-white/10 text-white font-bold active:bg-white/15">▲</button>
        <div />
        <button onClick={dpadDir('left')} className="aspect-square rounded-lg bg-white/5 border border-white/10 text-white font-bold active:bg-white/15">◀</button>
        <div />
        <button onClick={dpadDir('right')} className="aspect-square rounded-lg bg-white/5 border border-white/10 text-white font-bold active:bg-white/15">▶</button>
        <div />
        <button onClick={dpadDir('down')} className="aspect-square rounded-lg bg-white/5 border border-white/10 text-white font-bold active:bg-white/15">▼</button>
        <div />
      </div>
    </div>
  );
};

export default SnakeGame;
