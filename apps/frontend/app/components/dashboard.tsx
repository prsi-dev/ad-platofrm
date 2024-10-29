import { redirect } from 'next/navigation';

import { createClient } from '../../utils/supabase/server';
import { logout } from '../login/actions';

export default async function Dashboard() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <div>
      <p>Hello {data.user.email}</p>
      <form>
        <button formAction={logout}>Log Out</button>
      </form>
    </div>
  );
}
