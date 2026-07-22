import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Ganesha from "@/models/Ganesha";
import { ganeshaSchema } from "@/lib/validations";

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

        // รับก้อนข้อมูลจาก Frontend
        const body = await request.json();

        // 2. ส่งข้อมูลเข้าเครื่องสแกนของ Zod
        const validation = ganeshaSchema.safeParse(body);

        // 3. ถ้าสแกนไม่ผ่าน (ข้อมูลผิดกฎ) ให้เด้งกลับทันที พร้อมส่งข้อความ Error ไปบอก Frontend
        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.issues[0].message },
                { status: 400 },
            );
        }

        // 4. ถ้าผ่านหมด ให้ใช้ข้อมูลที่คลีนแล้ว (validation.data) ไปเซฟลง Database
        const newGanesha = await Ganesha.create(validation.data);

        return NextResponse.json(newGanesha, { status: 201 });
    } catch (error) {
        console.error("Create Ganesha Error:", error);
        return NextResponse.json(
            { error: "เกิดข้อผิดพลาดในการสร้างข้อมูล" },
            { status: 500 },
        );
    }
}
