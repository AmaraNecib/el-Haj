import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
    const airports = await prisma.airport.findMany({});
    return NextResponse.json(airports, {status: 200});
}

export const POST = async (req: NextRequest) => {
    // @ts-ignore
    const { name, city, country, gates } = await req.json();
    if(!name || !city || !country || !gates) return NextResponse.json({error: "Missing fields"}, {status: 400});
    try{
        const airport = await prisma.airport.create({
            data: {
                name,
                city,
                country,
                gates: parseInt(gates)
            }
        });
        return NextResponse.json({airport}, {status: 201});
    }catch(error){
        return NextResponse.json({error: "Error here"},{status: 500});
    }
}