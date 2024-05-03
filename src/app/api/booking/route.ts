import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
    // get id from url query
  const bookings = await prisma.booking.findMany({
  });
  return NextResponse.json(bookings);
};
export const POST = async (req: NextRequest, res: NextResponse) => {
  // @ts-ignore
  const { statusId, flightId, userId } = req.json();
  const booking = await prisma.booking.create({
    // @ts-ignore
    data: {
      statusId,
      flightId,
      userId,
    },
  });
  return NextResponse.json({ booking }, { status: 201 });
};
