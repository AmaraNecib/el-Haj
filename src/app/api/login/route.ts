import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { login } from "@/lib/auth";
export const POST = async (req: NextRequest, res: NextResponse) => {
    const { email, password } = await req.json();
    const user = await prisma.user.findFirst({
        where: {
            email,
            password
        }
    });
    if (!user) {
        return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }
    const token = await login(user.id)
    return NextResponse.json({success: true, token}, {status: 200})
}