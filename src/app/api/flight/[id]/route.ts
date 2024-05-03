import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
    // get id from url query
  const id = parseInt(await req.url.split("/")[5]);
  if(!id) return NextResponse.json({error: "Missing fields"}, {status: 400});

  const booking = await prisma.booking.create({
      data: {
      flightId: id,
      statusId: 1,
      userId: 1,
    },
  });
  return NextResponse.json({booking}, { status: 201 });
};
