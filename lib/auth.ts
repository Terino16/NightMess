// lib/auth.ts
import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';
import { NextApiRequest } from 'next';

export async function getUserBySession(req:NextApiRequest) {
  const session = await getSession({ req });
  if (!session || !session.user) {
    return null;
  }

  const email = session.user.email;
  if (!email) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}
