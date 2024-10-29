import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { LoaderFunction } from '@remix-run/node';
import { json, Link, NavLink, useLoaderData } from '@remix-run/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card';
import { SupabaseServerClient } from 'lib/supabase.server';
import { format } from 'date-fns';

export const loader: LoaderFunction = async ({ request, params }) => {
  const {
    data: { session },
  } = await SupabaseServerClient(request).auth.getSession();
  const response = await fetch('http://localhost:4000/advertisements', {
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });

  const advertisements = await response.json();

  return json({ advertisements });
};

export default function Advertisements() {
  const { advertisements } = useLoaderData<typeof loader>();
  console.log(advertisements);

  if (advertisements.length === 0 || !advertisements) {
    return <div>No advertisements found</div>;
  }
  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-2xl font-bold my-6'>Advertisements</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {advertisements.map((ad) => (
          <Link key={ad.id} to={`/advertisements/${ad.id}`}>
            <Card key={ad.id} className='overflow-hidden'>
              <CardHeader>
                <CardTitle className='text-lg'>{ad.title}</CardTitle>
                <CardDescription className='text-sm'>{ad.description}</CardDescription>
              </CardHeader>
              <AspectRatio ratio={16 / 9}>
                <img src={ad.images[0]} alt={ad.title} className='object-cover w-full h-full' loading='lazy' />
              </AspectRatio>
              <CardContent className='p-4'>
                <p className='font-bold'>Price: ${ad.price.toFixed(2)}</p>
                <p>Status: {ad.status}</p>
                <p>Ad Duration: {ad.adDuration}</p>
                <p>Created: {format(new Date(ad.createdAt), 'MMMM d, yyyy')}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
