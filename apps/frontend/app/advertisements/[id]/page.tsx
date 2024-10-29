import { getAuthenticatedUser } from '../../lib/supabase';

const fetchAdvertisementById = async (domain: string, id: string) => {
  const { session } = await getAuthenticatedUser();

  const response = await fetch(`http://localhost:4000/${domain}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.access_token}`,
    },
  });
  console.log(response);

  if (!response.ok) {
    throw new Error(`Failed to fetch advertisement by id: ${id}`);
  }

  return response.json();
};

export default async function AdvertismentsDetailPage({ params }: { params: { id: string } }) {
  const ad = await fetchAdvertisementById('advertisements', params.id);

  // if session and owner email match enable edit view enabling a edit button
  return (
    <div>
      <div>
        <h1>{ad.title}</h1>
        <p>{ad.description}</p>
        <p>Price: ${ad.price}</p>
      </div>
    </div>
  );
}
