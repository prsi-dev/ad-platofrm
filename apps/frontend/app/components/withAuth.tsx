'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
  return (props: P) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push('/signin');
      }
    }, [user, router]);

    if (!user) {
      return null;
    }

    return <WrappedComponent {...(props as P & JSX.IntrinsicAttributes)} />;
  };
}
