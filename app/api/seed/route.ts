import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Ganesha from "@/models/Ganesha";
import { ganeshaRawData } from "./ganeshaData";

export async function GET() {
    try {
        await connectMongo();
        await Ganesha.deleteMany({});

        // ใช้ข้อมูลที่ Import เข้ามา (ganeshaRawData) นำมา Map
        const seedData = ganeshaRawData.map((item) => {
            const allWeapons = [...item.weapons];
            if (
                item.trunkHolds !== "ไม่มี" &&
                item.trunkHolds !== "ไม่มี (ปล่อยงวงตามธรรมชาติ)"
            ) {
                allWeapons.push(item.trunkHolds);
            }

            return {
                order: item.order,
                nameTH: item.nameTH,
                nameEN: item.nameEN,
                prays: 0,
                meaning: `${item.description} (พรที่ประทาน: ${item.blessings.join(", ")})`,
                color: item.bodyColor,
                vehicle: `${item.vahana} / ${item.posture}`,
                weapons: allWeapons.join(", "),
                imageUrl:
                    "https://res.cloudinary.com/s0vscy04/image/upload/w_800,q_auto,f_auto/007_ncz2qc.png",
                mantra: `${item.mantraTH} \n${item.mantraPhonetic}`,
                isDeleted: false,
            };
        });

        const inserted = await Ganesha.insertMany(seedData);

        return NextResponse.json({
            message: "Seeding successful! ข้อมูลเข้า Database ครบถ้วนแล้วครับ",
            count: inserted.length,
        });
    } catch (error) {
        console.error("Seed error:", error);
        return NextResponse.json(
            { error: "Failed to seed data" },
            { status: 500 },
        );
    }
}
