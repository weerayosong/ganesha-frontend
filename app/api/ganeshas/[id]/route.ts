import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Ganesha from "@/models/Ganesha";

// ฟังก์ชัน PUT สำหรับอัปเดตข้อมูล
export async function PUT(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        await connectMongo();
        const body = await request.json();

        // ค้นหาตาม ID แล้วอัปเดตข้อมูลใหม่ทับลงไป
        const updatedGanesha = await Ganesha.findByIdAndUpdate(
            params.id,
            { $set: body },
            { new: true }, // ให้คืนค่ากลับมาเป็นข้อมูลใหม่ที่อัปเดตแล้ว
        );

        if (!updatedGanesha) {
            return NextResponse.json(
                { error: "ไม่พบข้อมูลปางนี้ในระบบ" },
                { status: 404 },
            );
        }

        return NextResponse.json(updatedGanesha);
    } catch (error) {
        console.error("API PUT Error:", error);
        return NextResponse.json(
            { error: "Failed to update ganesha data" },
            { status: 500 },
        );
    }
}
