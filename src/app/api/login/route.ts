import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
    const { email, password,name } = await req.json();
    const user = await prisma.user.findFirst({
        where: {
            email,
            name,
            password
        }
    });
}