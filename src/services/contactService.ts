export interface SendContactMessagePayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  source?: string;
  userAgent?: string;
}

export interface SendContactMessageResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Sends a validated contact message to Zyad Wael via Supabase Edge Function gateway.
 * Dynamically imports supabase client to keep initial bundle size minimal.
 */
export async function sendContactMessage(
  payload: SendContactMessagePayload
): Promise<SendContactMessageResult> {
  try {
    const { supabase } = await import('@/integrations/supabase/client');

    const { data, error } = await supabase.functions.invoke('send-contact-email', {
      body: {
        name: payload.name.trim(),
        email: payload.email.trim(),
        subject: payload.subject.trim(),
        message: payload.message.trim(),
        source: payload.source || 'portfolio_contact_form',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      },
    });

    if (error) {
      console.error('[contactService] Supabase function error:', error);
      return {
        success: false,
        error: error.message || 'Failed to dispatch contact message',
      };
    }

    if (data?.error) {
      return {
        success: false,
        error: data.error,
      };
    }

    return {
      success: true,
      messageId: data?.messageId || data?.id,
    };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred while sending your message';
    console.error('[contactService] Unexpected dispatch error:', err);
    return {
      success: false,
      error: errorMsg,
    };
  }
}
