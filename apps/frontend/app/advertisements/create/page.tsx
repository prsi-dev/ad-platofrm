'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function CreateAdvertisementPage() {
  const { session } = useAuth();
  console.dir(session);

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (newAd: {
      title: string;
      description: string;
      price: number;
      owner: { connect: { email: string | undefined } };
    }) => {
      console.log('mutationFn', newAd);

      const response = await fetch(`http://localhost:4000/advertisements/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAd),
      });
      if (!response.ok) {
        throw new Error('Failed to create advertisement');
      }
      console.log(response.json());

      return response.json();
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['/advertisements'] });
      router.push('/advertisements');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMutation.mutate({
      title: form.title,
      price: parseFloat(form.price),
      description: form.description,
      owner: { connect: { email: session?.user?.email } },
    });
  };
  console.log(form.title, form.description, form.price);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor='description'>Description</label>
        <textarea
          id='description'
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor='price'>Price</label>
        <input
          type='number'
          id='price'
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
          step='0.01'
        />
      </div>
      <button type='submit'>Create Advertisement</button>
    </form>
  );
}
