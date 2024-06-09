import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();
    if (!id) {
      return NextResponse.json({ message: 'Missing user ID' }, { status: 400 });
    }

    const body = await req.json();
    const { email, name, hostel, phone, room, seller } = body;
    if(!email)
      return NextResponse.json({"message":"No Email"});

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (seller) {
      const existingSeller = await prisma.seller.findUnique({
        where: { email:email }, 
      });

      if (existingSeller) {
        await prisma.seller.update({
          where: { email: email },
          data: {
            name: name || existingUser.name,
            hostel: hostel || existingUser.hostel,
            room: room || existingUser.room,
            phone: phone || existingUser.phone,
          },
        });
      } else {
        await prisma.seller.create({
          data: {
            id: id,
            email:email|| existingUser.email,
            name: name || existingUser.name,
            hostel: hostel || existingUser.hostel,
            room: room || existingUser.room,
            phone: phone || existingUser.phone,
          },
        });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        hostel,
        phone,
        room,
        seller,
      },
    });

    return NextResponse.json({ message: 'User updated successfully', updatedUser }, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
