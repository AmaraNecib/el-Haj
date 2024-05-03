import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
export const POST = async(req:NextRequest) =>{
    const {email, password, name} = await req.json();

    if(!email || !password|| !name) return NextResponse.json({success: false, message: "Missing fields"},{status: 400});
    const bcPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            email,
            password: bcPassword,
            name
        }
    });
    return NextResponse.json({success: true, user},{status: 201});
}