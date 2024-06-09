
import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {name, photo, quantity, price,email } = body;

    if (!name||!photo || !price|| !email) {
      return NextResponse.json(
        { message: "Name,Photo, price,email are required" },
        { status: 400 }
      );
    }

    const existingSeller = await prisma.seller.findUnique({
      where: { email:email},
    });

    if (!existingSeller) {
      return NextResponse.json({ message: "Seller not found" }, { status: 404 });
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      return NextResponse.json(
        { message: "Price must be a valid number" },
        { status: 400 }
      );
    }

    const parsedQuantity = parseFloat(quantity);
    if (isNaN(parsedQuantity)) {
      return NextResponse.json(
        { message: "Quantity must be a valid number" },
        { status: 400 }
      );
    }

    const newItem = await prisma.item.create({
      data: {
        name,
        photo,
        quantity:parsedQuantity,
        price:parsedPrice,
        sellerId: existingSeller.id,
      },
    });

    return NextResponse.json({ message: "Item added successfully", newItem }, { status: 201 });
  } catch (error) {
    console.error('Error adding item:', error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
