import { supabase } from '@/integrations/supabase/client';

const VISITOR_KEY = 'portfolio-visitor-id';

export function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return 'anon';
  }
}

export type GameName = 'tictactoe' | 'snake';

export async function recordPlay(game: GameName, result: string, score = 0) {
  try {
    await supabase.from('game_plays').insert({
      game,
      result,
      score,
      visitor_id: getVisitorId(),
    });
  } catch (e) {
    console.warn('recordPlay failed', e);
  }
}

export interface GameTotals {
  total: number;
  wins: number;
  losses: number;
  draws: number;
  topScore: number;
}

export async function fetchGameTotals(game: GameName): Promise<GameTotals> {
  try {
    const { data, error } = await supabase
      .from('game_plays')
      .select('result, score')
      .eq('game', game)
      .limit(10000);
    if (error || !data) return { total: 0, wins: 0, losses: 0, draws: 0, topScore: 0 };
    const totals: GameTotals = { total: data.length, wins: 0, losses: 0, draws: 0, topScore: 0 };
    for (const row of data) {
      if (row.result === 'win') totals.wins++;
      else if (row.result === 'loss') totals.losses++;
      else if (row.result === 'draw') totals.draws++;
      if ((row.score ?? 0) > totals.topScore) totals.topScore = row.score ?? 0;
    }
    return totals;
  } catch {
    return { total: 0, wins: 0, losses: 0, draws: 0, topScore: 0 };
  }
}
