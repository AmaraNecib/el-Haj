import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
    // get id from url query
    const id = parseInt(await req.url.split("/")[5]);
  const bookings = await prisma.booking.findMany({
    where: {
      id,
    },
  });
  return NextResponse.json(bookings);
};
export const POST = async (req: NextRequest, res: NextResponse) => {
  // @ts-ignore
  const { startTime, endTime, statusId, flightId, userId } = req.json();
  const booking = await prisma.booking.create({
    // @ts-ignore
    data: {
      startTime,
      endTime,
      statusId,
      flightId,
      userId,
    },
  });
  return NextResponse.json({ booking }, { status: 201 });
};
