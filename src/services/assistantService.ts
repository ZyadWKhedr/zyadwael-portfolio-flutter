export interface AssistantMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface QueryAssistantResult {
  reply: string;
  isFallback?: boolean;
}

/**
 * Queries the Gemini-backed portfolio assistant via Supabase Edge Function.
 * Dynamically imports supabase client to keep initial bundle size minimal.
 */
export async function queryAssistant(
  prompt: string,
  history: AssistantMessage[] = []
): Promise<QueryAssistantResult> {
  try {
    const { supabase } = await import('@/integrations/supabase/client');

    const { data, error } = await supabase.functions.invoke('portfolio-assistant', {
      body: {
        prompt: prompt.trim(),
        history: history.slice(-6), // Send last 6 turns for context
      },
    });

    if (error) {
      console.error('[assistantService] Supabase function error:', error);
      throw error;
    }

    const reply = data?.reply || data?.response || data?.message;
    if (!reply) {
      throw new Error('Empty response from AI assistant service');
    }

    return {
      reply,
      isFallback: false,
    };
  } catch (err) {
    console.error('[assistantService] Assistant invocation failed, returning grounded fallback:', err);
    return {
      reply:
        "Zyad Wael is a Software Engineer specializing in mobile development with Flutter as his main framework, based in Alexandria, Egypt. With broad cross-platform expertise spanning Clean Architecture, BLoC state management, offline-first systems, and custom canvas rendering, he mentors developers in the Flutter Committee at HackerRank Campus Club and has shipped commercial production applications including Amoomy (logistics dispatch) and Raval (fashion e-commerce). Feel free to reach out directly at ziad.w.khedr@gmail.com or connect on LinkedIn!",
      isFallback: true,
    };
  }
}
