import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Ganesha from "@/models/Ganesha";

// ฟังก์ชัน PUT สำหรับอัปเดตข้อมูล
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }, // ปรับ Type ของ params
) {
    try {
        await connectMongo();
        const body = await request.json();

        // เพิ่ม await ก่อนเรียกใช้ params (รองรับ Next.js 15)
        const resolvedParams = await params;
        const id = resolvedParams.id;

        const updatedGanesha = await Ganesha.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true },
        );

        if (!updatedGanesha) {
            return NextResponse.json(
                { error: "ไม่พบข้อมูลปางนี้" },
                { status: 404 },
            );
        }

        return NextResponse.json(updatedGanesha);
    } catch (error) {
        console.error("API PUT Error:", error);
        return NextResponse.json(
            { error: "Failed to update" },
            { status: 500 },
        );
    }
}

// ฟังก์ชัน PATCH สำหรับเปิด-ปิดสถานะ (Toggle Visibility)
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        await connectMongo();

        const resolvedParams = await params;
        const id = resolvedParams.id;
        const body = await request.json(); // รับค่าที่หน้าบ้านส่งมาว่าให้เป็น true หรือ false

        const updatedGanesha = await Ganesha.findByIdAndUpdate(
            id,
            { $set: { isDeleted: body.isDeleted } },
            { new: true },
        );

        if (!updatedGanesha) {
            return NextResponse.json(
                { error: "ไม่พบข้อมูลปางนี้" },
                { status: 404 },
            );
        }

        return NextResponse.json({ message: "อัปเดตสถานะการมองเห็นเรียบร้อย" });
    } catch (error) {
        console.error("API PATCH Error:", error);
        return NextResponse.json(
            { error: "Failed to update visibility" },
            { status: 500 },
        );
    }
}
