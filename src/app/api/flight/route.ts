import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "path";

export const GET = async (req: NextRequest, res: NextResponse) => {
    try{

        const flights = await prisma.flight.findMany({});
        return NextResponse.json({success:true, flights},{status: 200});
    }catch(error){
        return NextResponse.json({message: "Error"},{status: 500});
    }
}
export const POST = async (req: NextRequest, res: NextResponse) => {
    // @ts-ignore
    // try{ 
    const  { to,price,timeOfFlight,airportId,startTime,endTime } = await req.json();

    const airport = await prisma.airport.findUnique({where: {id: airportId}});
    if(!airport) return NextResponse.json({message: "Airport not found"}, {status: 404});
    const flight = await prisma.flight.create({
        // @ts-ignore
        data: {
            from: airport.city,
            to,
            price : parseInt(price),
            timeOfFlight: parseInt(timeOfFlight),
            endTime: new Date(endTime).toISOString(),
            startTime: new Date(startTime).toISOString(),
            airport: {
                connect: {
                    id: parseInt(airportId)
                }
            }
        }
    });
    return NextResponse.json({flight}, {status: 201});
// }
//     catch(error){
//         return NextResponse.json({message: "Error"},{status: 500});
//     }
}