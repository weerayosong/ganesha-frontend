import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const { password } = await request.json();
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "1234";

        if (password === ADMIN_PASSWORD) {
            // ใส่ await ตรง cookies() ตามที่ Next.js บังคับ
            const cookieStore = await cookies();
            cookieStore.set({
                name: "admin_token",
                value: "authenticated_true",
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * 24, // 1 วัน
            });

            return NextResponse.json(
                { message: "Login สำเร็จ" },
                { status: 200 },
            );
        }

        return NextResponse.json(
            { error: "รหัสผ่านไม่ถูกต้อง" },
            { status: 401 },
        );
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
