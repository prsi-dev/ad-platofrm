import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AuthButton from './auth-button';
import { createClient } from '../../utils/supabase/server';
import { getAuthenticatedUser } from '../lib/supabase';

export default async function Home() {
  const { user, session } = await getAuthenticatedUser();

  if (!user || !session) {
    redirect('/login');
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <h1 className='text-4xl font-bold mb-8'>Welcome, {user.email}!</h1>
    </main>
  );
}
