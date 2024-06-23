// pages/api/user.ts

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, name, phone, hostel, room } = body;

  if (!email) {
    return NextResponse.json({ error: "Email is required" });
  }

  try {
    const user = await prisma.user.update({
      where: { email },
      data: {
        name,
        phone,
        hostel,
        room: parseInt(room, 10),
        profile:true
      },
    });

    return NextResponse.json({ message: "Success", user });
  } catch (error) {
    console.error("Error updating user:", error);
    NextResponse.json({ error: "Internal server error" });
  }
}
