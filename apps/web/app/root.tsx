import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  useLoaderData,
} from '@remix-run/react';
import { json, LinksFunction, LoaderFunction } from '@remix-run/node';
import { createServerClient, parseCookieHeader, serializeCookieHeader, createBrowserClient } from '@supabase/ssr';
import { useState, useEffect } from 'react';
import './tailwind.css';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export const loader: LoaderFunction = async ({ request }) => {
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

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const currentPath = new URL(request.url).pathname;

  if (!session && currentPath !== '/login') {
    return new Response('Redirect', {
      status: 302,
      headers: {
        Location: '/login',
      },
    });
  }

  return json(
    {
      session,
    },
    {
      headers,
    },
  );
};

/* export function App({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
} */

export default function App() {
  const { session: serverSession } = useLoaderData<typeof loader>();
  const [supabase] = useState(() =>
    createBrowserClient(import.meta.env.VITE_SUPABASE_URL!, import.meta.env.VITE_SUPABASE_ANON_KEY!),
  );
  const [session, setSession] = useState(serverSession);
  console.log(session);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      if (currentSession?.access_token !== session?.access_token) {
        setSession(currentSession);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, session]);

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet context={{ session, supabase }} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let status = 500;
  let message = 'An unexpected error occurred.';
  if (isRouteErrorResponse(error)) {
    status = error.status;
    switch (error.status) {
      case 404:
        message = 'Page Not Found';
        break;
    }
  } else {
    console.error(error);
  }

  return (
    <div className='container prose py-8'>
      <h1>{status}</h1>
      <p>{message}</p>
    </div>
  );
}
