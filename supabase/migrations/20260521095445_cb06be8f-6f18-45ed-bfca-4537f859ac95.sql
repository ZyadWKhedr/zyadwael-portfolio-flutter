
CREATE TABLE public.game_plays (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  game TEXT NOT NULL,
  result TEXT,
  score INTEGER NOT NULL DEFAULT 0,
  visitor_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_game_plays_game ON public.game_plays (game);
CREATE INDEX idx_game_plays_visitor ON public.game_plays (visitor_id);

ALTER TABLE public.game_plays ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert game plays"
  ON public.game_plays FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read game plays"
  ON public.game_plays FOR SELECT
  TO anon, authenticated
  USING (true);
