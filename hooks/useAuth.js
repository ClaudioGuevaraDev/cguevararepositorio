import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { auth } from '@/libs/firebase';

function useAuth() {
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, (user) => {
      if (user == null) {
        setUser(null);
        router.push('/');
      } else {
        setUser(user);
      }
    });

    return () => unsubuscribe();
  }, [router]);

  return { user };
}

export default useAuth;
