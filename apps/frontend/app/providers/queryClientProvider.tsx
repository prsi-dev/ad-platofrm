'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { getSession } from '../lib/supabase';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            queryFn: async ({ queryKey }) => {
              const session = await getSession();
              const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${queryKey[0]}`, {
                headers: {
                  Authorization: `Bearer ${session?.access_token}`,
                },
              });
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            },
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
