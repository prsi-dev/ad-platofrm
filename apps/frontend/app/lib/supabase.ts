import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createClient as serverClient } from '../../utils/supabase/server';

export const createAuthClient = () => {
  return createClientComponentClient();
};

export async function getSession() {
  const supabase = createAuthClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

export async function createServerAuthClient() {
  const cookieStore = await cookies();

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}

export async function getAuthenticatedUser() {
  const supabase = serverClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    return { user: null, session: null };
  }

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !sessionData?.session) {
    return { user: null, session: null };
  }

  return { user: userData.user, session: sessionData.session };
}
