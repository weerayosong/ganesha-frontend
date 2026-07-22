import { NextResponse } from "next/server";
import cloudinary from "../../../lib/cloudinary";

export async function POST(request: Request) {
    try {
        // 1. รับข้อมูลจากฟอร์ม
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "ไม่พบไฟล์รูปภาพ" },
                { status: 400 },
            );
        }

        // 2. แปลงไฟล์เป็น Buffer เพื่อเตรียมส่งผ่านเน็ตเวิร์ก
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // 3. แปลงเป็น Base64 String ให้ Cloudinary อ่านง่ายๆ
        const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

        // 4. สั่งอัปโหลดขึ้น Cloudinary (เก็บในโฟลเดอร์ ganesha)
        const uploadResponse = await cloudinary.uploader.upload(base64Image, {
            folder: "ganesha",
        });

        // 5. ส่ง URL รูปที่ใช้งานได้จริงกลับไปให้หน้าบ้าน
        return NextResponse.json({ secure_url: uploadResponse.secure_url });
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json(
            { error: "อัปโหลดรูปภาพล้มเหลว" },
            { status: 500 },
        );
    }
}
