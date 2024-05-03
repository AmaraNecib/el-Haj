import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
    try{

        const flights = await prisma.flight.findMany({});
        return NextResponse.json(flights,{status: 200});
    }catch(error){
        return NextResponse.json({message: "Error"},{status: 500});
    }
}
export const POST = async (req: NextRequest, res: NextResponse) => {
    // @ts-ignore
    try{ const { from, to, date, price,timeOfFlight,airportId } = req.json();
    const flight = await prisma.flight.create({
        // @ts-ignore
        data: {
            from,
            to,
            date,
            price,
            timeOfFlight,
            airport: {
                connect: {
                    id: airportId
                }
            }
        }
    });
    return NextResponse.json({flight}, {status: 201});}
    catch(error){
        return NextResponse.json({message: "Error"},{status: 500});
    }
}