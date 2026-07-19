import { Schema, model, models } from "mongoose";

const ganeshaSchema = new Schema(
    {
        order: { type: Number, required: true, unique: true },
        nameTH: { type: String, required: true },
        nameEN: { type: String, required: true },
        prays: { type: Number, default: 0 },
        meaning: { type: String },
        color: { type: String },
        vehicle: { type: String },
        weapons: { type: String },
        isDeleted: { type: Boolean, default: false }, // สำหรับทำ Soft Delete
    },
    { timestamps: true }, // ให้มันเก็บ createAt, updatedAt อัตโนมัติ
);

// เช็คว่ามี Model นี้อยู่แล้วหรือยัง (ป้องกัน error ตอน Next.js รีโหลด)
const Ganesha = models.Ganesha || model("Ganesha", ganeshaSchema);

export default Ganesha;
