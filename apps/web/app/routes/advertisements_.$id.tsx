import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card';
import { format } from 'date-fns';
import { SupabaseServerClient } from 'lib/supabase.server';

export const loader: LoaderFunction = async ({ request, params }) => {
  const {
    data: { session },
  } = await SupabaseServerClient(request).auth.getSession();
  const response = await fetch(`http://localhost:4000/advertisements/${params.id}`, {
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });

  const advertisement = await response.json();

  return json({ advertisement });
};

const AdvertisementDetail = () => {
  const { advertisement } = useLoaderData<typeof loader>();
  return (
    <div>
      <Card key={advertisement.id} className='overflow-hidden rounded-none'>
        <CardHeader>
          <CardTitle className='text-lg'>{advertisement.title}</CardTitle>
          <CardDescription className='text-sm'>{advertisement.description}</CardDescription>
        </CardHeader>
        <AspectRatio ratio={16 / 9}>
          <img
            src={advertisement.images[0]}
            alt={advertisement.title}
            className='object-cover w-full h-full'
            loading='lazy'
          />
        </AspectRatio>
        <CardContent className='p-4'>
          <p className='font-bold'>Price: ${advertisement.price.toFixed(2)}</p>
          <p>Status: {advertisement.status}</p>
          <p>Ad Duration: {advertisement.adDuration}</p>
          <p>Created: {format(new Date(advertisement.createdAt), 'MMMM d, yyyy')}</p>
        </CardContent>
      </Card>{' '}
    </div>
  );
};

export default AdvertisementDetail;
