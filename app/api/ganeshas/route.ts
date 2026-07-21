import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Ganesha from "@/models/Ganesha";

export async function GET() {
    try {
        await connectMongo();

        // ดึงข้อมูลทั้งหมดโดยไม่ต้องกรอง isDeleted: false
        // และเรียงลำดับตาม order จากน้อยไปมาก
        const ganeshas = await Ganesha.find({}).sort({ order: 1 });

        return NextResponse.json(ganeshas);
    } catch (error) {
        console.error("API GET Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch data" },
            { status: 500 },
        );
    }
}

export async function POST(request: Request) {
    try {
        await connectMongo();

        // รับข้อมูลที่ส่งมาจากหน้าเว็บ
        const body = await request.json();

        // สร้างข้อมูลใหม่ลง Database
        const newGanesha = await Ganesha.create({
            ...body,
            isDeleted: false,
        });

        return NextResponse.json(newGanesha, { status: 201 });
    } catch (error) {
        console.error("API POST Error:", error);
        return NextResponse.json(
            { error: "Failed to create ganesha data" },
            { status: 500 },
        );
    }
}
