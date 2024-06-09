import { PrismaClient } from '@prisma/client';

import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password ,phone,name} = body;

    if (!email || !password ||!phone || !name) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email:email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const existingPhone = await prisma.user.findUnique({
      where: { phone:phone },
    });

    if (existingPhone) {
      return NextResponse.json({ message: 'Phone Number already exists' }, { status: 400 });
    }



    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name:name,
        hostel:"",
        room:0,
        phone:phone,
        seller:false,
      },
    });

    return NextResponse.json({ message: 'User created successfully', user }, { status: 200 });
  } catch (error) {
    console.error('Error creating user in Register section API', error);
    return NextResponse.json({ message: 'Error in creating User RN' }, { status: 500 });
  }
}
