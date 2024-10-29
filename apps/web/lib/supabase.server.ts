import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr';
import { type SupabaseClient } from '@supabase/supabase-js';

export function SupabaseServerClient(request: Request) {
  const headers = new Headers();

  const supabase = createServerClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get('Cookie') ?? '');
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          headers.append('Set-Cookie', serializeCookieHeader(name, value, options)),
        );
      },
    },
  });

  return supabase;
}

export type TypedSupabaseClient = SupabaseClient;
