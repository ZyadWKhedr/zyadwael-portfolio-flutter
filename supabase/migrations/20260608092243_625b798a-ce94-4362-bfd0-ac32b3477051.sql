DROP POLICY IF EXISTS "Anyone can read game plays" ON public.game_plays;
REVOKE SELECT ON public.game_plays FROM anon, authenticated;