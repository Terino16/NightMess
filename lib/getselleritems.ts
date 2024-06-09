import prisma from './prisma';

export async function getselleritems(email: string) {
  try {
    const seller = await prisma.seller.findUnique({
      where: { email },
      include: {
        items: true,
      },
    });

    if (!seller) {
      throw new Error('Seller not found');
    }

    return seller.items;
  } catch (error) {
    console.error('Error fetching seller items:', error);
    throw error;
  }
}
