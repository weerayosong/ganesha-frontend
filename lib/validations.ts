import { z } from "zod";

// สร้าง Schema และกำหนดข้อความแจ้งเตือน (Error Message) เมื่อข้อมูลไม่ตรงเงื่อนไข
export const ganeshaSchema = z.object({
    // ใช้ z.coerce.number() เพื่อแปลงค่า String ที่รับมาจากฟอร์มให้เป็น Number อัตโนมัติ
    order: z.coerce.number().min(1, "ลำดับปางต้องมีค่าอย่างน้อย 1"),
    nameTH: z.string().min(1, "กรุณากรอกชื่อปาง (ภาษาไทย)"),
    nameEN: z.string().min(1, "กรุณากรอกชื่อปาง (ภาษาอังกฤษ)"),
    prays: z.coerce.number().min(0, "จำนวนสักการะห้ามติดลบ"),

    // .optional() หมายถึง อนุญาตให้เว้นว่างได้ (ไม่บังคับกรอก)
    meaning: z.string().optional(),
    color: z.string().optional(),
    vehicle: z.string().optional(),
    weapons: z.string().optional(),
    imageUrl: z.string().optional(),
    mantra: z.string().optional(),
});
