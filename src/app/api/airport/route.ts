import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
    const airports = await prisma.airport.findMany({});
    return NextResponse.json(airports);
}
export const POST = async (req: NextRequest, res: NextResponse) => {
    // @ts-ignore
    const { name, city, country, gates } = req.json();
    const airport = await prisma.airport.create({
        data: {
            name,
            city,
            country,
            gates: parseInt(gates)
        }
    });
    return NextResponse.json({airport}, {status: 201});
}


type airport = {
    name: string;
    city: string;
    country: string;
    gates: number;
    createdAt: Date;
    updatedAt: Date;
}