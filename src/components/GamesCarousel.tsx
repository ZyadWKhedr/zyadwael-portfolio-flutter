import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TicTacToeGame from './TicTacToeGame';
import SnakeGame from './SnakeGame';

const games = [
  { id: 'ttt', label: 'Tic Tac Toe', Component: TicTacToeGame },
  { id: 'snake', label: 'Snake', Component: SnakeGame },
];

const GamesCarousel = () => {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(0);

  const go = (n: number) => {
    setDir(n);
    setIdx((i) => (i + n + games.length) % games.length);
  };

  const Active = games[idx].Component;

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* Game tabs */}
      <div className="flex items-center gap-2 w-full">
        <button
          onClick={() => go(-1)}
          className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10"
          aria-label="Previous game"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 flex items-center justify-center gap-1.5">
          {games.map((g, i) => (
            <button
              key={g.id}
              onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                i === idx
                  ? 'bg-flutter-gradient text-white shadow-md shadow-flutter-blue/40'
                  : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => go(1)}
          className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10"
          aria-label="Next game"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Swipe area */}
      <div className="w-full overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={games[idx].id}
            initial={{ opacity: 0, x: dir > 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir > 0 ? -60 : 60 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
          >
            <Active />
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="text-[10px] uppercase tracking-widest text-gray-500">Swipe ← → or tap to switch</p>
    </div>
  );
};

export default GamesCarousel;
