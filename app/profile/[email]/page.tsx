import { notFound } from 'next/navigation';
import { getUserByEmail } from '@/lib/user';
import ProfilePage from '@/components/ProfilePage';
import { User } from '@prisma/client';

interface Params {
  params: {
    email: string;
  };
}

const fetchUser = (email: string): Promise<User|null> => {
  return getUserByEmail(email);
};

export default async function Page({ params }: Params) {
  const { email } = params;
  const decodedEmail = decodeURIComponent(email);
  const user = await fetchUser(decodedEmail);

  if (!user) {
    notFound();
  }

  return <ProfilePage user={user} />;
}
