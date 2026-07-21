import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Ganesha from "@/models/Ganesha";

export async function GET() {
    try {
        await connectMongo();

        // ดึงข้อมูลทั้งหมดที่ยังไม่ได้ถูกลบ (isDeleted: false) เรียงตามลำดับ
        const ganeshas = await Ganesha.find({ isDeleted: false })
            .sort({ order: 1 })
            .lean();

        return NextResponse.json(ganeshas);
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch ganeshas data" },
            { status: 500 },
        );
    }
}
