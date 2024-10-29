import { useActionData, useNavigate } from '@remix-run/react';
import { json } from '@remix-run/node';
import type { ActionFunction } from '@remix-run/node';
import type { SupabaseClient } from '@supabase/supabase-js';

export const action: ActionFunction = async ({ request, context }) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  const supabase = context.supabase as SupabaseClient;

  if (typeof email !== 'string' || typeof password !== 'string') {
    return json({ error: 'Invalid form data' }, { status: 400 });
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return json({ error: error.message }, { status: 400 });
  } else {
    return json({ success: true });
  }
};

export default function Login() {
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();

  if (actionData?.success) {
    navigate('/');
  }

  return (
    <div className='container mx-auto max-w-md mt-10'>
      <h1 className='text-2xl font-bold mb-5'>Login</h1>
      <form method='post' className='space-y-4'>
        <div>
          <label htmlFor='email' className='block mb-1'>
            Email
          </label>
          <input id='email' name='email' type='email' required className='w-full px-3 py-2 border rounded' />
        </div>
        <div>
          <label htmlFor='password' className='block mb-1'>
            Password
          </label>
          <input id='password' name='password' type='password' required className='w-full px-3 py-2 border rounded' />
        </div>
        <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded'>
          Log in
        </button>
      </form>
      {actionData?.error && <p className='text-red-500 mt-3'>{actionData.error}</p>}
    </div>
  );
}
