import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Ganesha from "@/models/Ganesha";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json(
                { error: "Missing Ganesha ID" },
                { status: 400 },
            );
        }

        await connectMongo();

        // ค้นหาปางด้วย ID แล้วบวกฟิลด์ prays ขึ้น 1
        const updated = await Ganesha.findByIdAndUpdate(
            id,
            { $inc: { prays: 1 } },
            { new: true },
        );

        if (!updated) {
            return NextResponse.json(
                { error: "Ganesha not found" },
                { status: 404 },
            );
        }

        return NextResponse.json({ success: true, prays: updated.prays });
    } catch (error) {
        console.error("Pray API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
