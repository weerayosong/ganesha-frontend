import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Ganesha from "@/models/Ganesha";
import { ganeshaSchema } from "@/lib/validations";

// ฟังก์ชัน PUT สำหรับอัปเดตข้อมูล
export async function PUT(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        await connectMongo();

        const body = await request.json();

        // 2. ส่งข้อมูลเข้าเครื่องสแกนของ Zod
        const validation = ganeshaSchema.safeParse(body);

        // 3. ถ้าสแกนไม่ผ่าน ให้เตือนกลับไป
        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.issues[0].message },
                { status: 400 },
            );
        }

        // 4. ถ้าผ่าน ให้เอาข้อมูลที่คลีนแล้วไปอัปเดต
        const updatedGanesha = await Ganesha.findByIdAndUpdate(
            params.id,
            validation.data, // ใช้ข้อมูลที่ผ่าน Zod แล้ว
            { new: true, runValidators: true }, // ให้มันคืนค่าตัวใหม่กลับมา
        );

        if (!updatedGanesha) {
            return NextResponse.json(
                { error: "ไม่พบข้อมูลที่ต้องการแก้ไข" },
                { status: 404 },
            );
        }

        return NextResponse.json(updatedGanesha);
    } catch (error) {
        console.error("Update Ganesha Error:", error);
        return NextResponse.json(
            { error: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล" },
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
