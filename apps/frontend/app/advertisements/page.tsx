import Link from 'next/link';
import { getAuthenticatedUser } from '../lib/supabase';
import { Suspense } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { format } from 'path';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';

interface Advertisement {
  id: string;
  title: string;
  description: string;
  price: number;
}
const fetchAdvertisements = async (domain: string) => {
  const { session } = await getAuthenticatedUser();

  const response = await fetch(`http://localhost:4000/${domain}`, {
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch advertisements');
  }

  return response.json();
};
export default async function AdvertisementsPage() {
  const ads = await fetchAdvertisements('advertisements');

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-2xl font-bold my-6'>Advertisements</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {ads.map((ad) => (
          <Link key={ad.id} href={`/advertisements/${ad.id}`}>
            <Card key={ad.id} className='overflow-hidden'>
              <CardHeader>
                <CardTitle className='text-lg'>{ad.title}</CardTitle>
                <CardDescription className='text-sm'>{ad.description}</CardDescription>
              </CardHeader>
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={ad.images[0]}
                  alt={ad.title}
                  className='object-cover w-full h-full'
                  loading='lazy'
                  height={400}
                  width={600}
                />
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
