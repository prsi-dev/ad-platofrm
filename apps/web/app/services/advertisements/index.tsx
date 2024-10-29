import { TypedSupabaseClient } from 'lib/supabase.server';

const API_URL = process.env.API_URL;

async function secureApiRequest<T>(
  supabase: TypedSupabaseClient,
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('No active session');
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}

export async function getAds(supabase: TypedSupabaseClient): Promise<object[]> {
  return secureApiRequest<[]>(supabase, '/advertisements');
}

export async function getAdById(supabase: TypedSupabaseClient, id: string): Promise<object | null> {
  return secureApiRequest<object | null>(supabase, `/advertisements/${id}`);
}

export async function createAd(
  supabase: TypedSupabaseClient,
  data: Omit<object, 'id' | 'userId' | 'createdAt'>,
): Promise<object> {
  return secureApiRequest<object>(supabase, '/advertisements', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateAd(supabase: TypedSupabaseClient, id: string, data: Partial<object>): Promise<object> {
  return secureApiRequest<object>(supabase, `/advertisements/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteAd(supabase: TypedSupabaseClient, id: string): Promise<void> {
  await secureApiRequest(supabase, `/advertisements/${id}`, {
    method: 'DELETE',
  });
}
