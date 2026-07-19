"use client";

import { FaXmark, FaFloppyDisk } from "react-icons/fa6";

interface GaneshaFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: "add" | "edit";
}

export default function GaneshaFormModal({
    isOpen,
    onClose,
    mode,
}: GaneshaFormModalProps) {
    if (!isOpen) return null;

    return (
        // ดัน z-index ขึ้นไปเผื่อไว้ที่ 9999
        <div className="fixed inset-0 z-9999 flex items-start md:items-center justify-center pt-24 pb-6 px-4 md:p-4 bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-300">
            {/* ปรับ max-h ให้เหลือ 85vh กันล้นจอ และเปลี่ยนเป็น rounded-xl */}
            <div className="bg-neutral-900 border border-amber-900/40 rounded-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto hide-scrollbar shadow-2xl relative animate-in zoom-in-95 duration-300">
                {/* Header: ลด Padding เหลือ p-4 */}
                <div className="sticky top-0 bg-neutral-900/95 backdrop-blur border-b border-neutral-800 p-4 flex items-center justify-between z-10">
                    <h2 className="text-lg font-serif font-bold text-amber-500">
                        {mode === "add"
                            ? "เพิ่มข้อมูลปางใหม่"
                            : "แก้ไขข้อมูลปาง"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                    >
                        <FaXmark className="w-4 h-4" />
                    </button>
                </div>

                {/* Form Body: ลด Padding (p-4) และ Gap (gap-3) */}
                <div className="p-4 flex flex-col gap-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                            <label className="block text-[11px] text-neutral-400 mb-1 uppercase tracking-wider">
                                ลำดับปาง
                            </label>
                            <input
                                type="number"
                                placeholder="เช่น 1"
                                className="w-full bg-neutral-950 border border-neutral-800 text-white text-sm rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 px-3 py-2 outline-none"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-[11px] text-neutral-400 mb-1 uppercase tracking-wider">
                                ชื่อปาง (ภาษาไทย)
                            </label>
                            <input
                                type="text"
                                placeholder="เช่น พาละ คณปติ"
                                className="w-full bg-neutral-950 border border-neutral-800 text-white text-sm rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 px-3 py-2 outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[11px] text-neutral-400 mb-1 uppercase tracking-wider">
                                ชื่อปาง (ภาษาอังกฤษ)
                            </label>
                            <input
                                type="text"
                                placeholder="เช่น Bala Ganapati"
                                className="w-full bg-neutral-950 border border-neutral-800 text-white text-sm rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 px-3 py-2 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] text-neutral-400 mb-1 uppercase tracking-wider">
                                จำนวนสักการะ (ครั้ง)
                            </label>
                            <input
                                type="number"
                                placeholder="เช่น 0"
                                className="w-full bg-neutral-950 border border-neutral-800 text-white text-sm rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 px-3 py-2 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] text-neutral-400 mb-1 uppercase tracking-wider">
                            ความหมาย / พรที่ประทาน
                        </label>
                        <textarea
                            rows={2}
                            placeholder="คำอธิบายความหมายของปางนี้..."
                            className="w-full bg-neutral-950 border border-neutral-800 text-white text-sm rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 px-3 py-2 outline-none resize-none"
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[11px] text-neutral-400 mb-1 uppercase tracking-wider">
                                วรรณะ (ผิวกาย)
                            </label>
                            <input
                                type="text"
                                placeholder="เช่น สีแดงส้ม"
                                className="w-full bg-neutral-950 border border-neutral-800 text-white text-sm rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 px-3 py-2 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] text-neutral-400 mb-1 uppercase tracking-wider">
                                พาหนะ / ท่าประทับ
                            </label>
                            <input
                                type="text"
                                placeholder="เช่น ประทับนั่งบนดอกบัว"
                                className="w-full bg-neutral-950 border border-neutral-800 text-white text-sm rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 px-3 py-2 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] text-neutral-400 mb-1 uppercase tracking-wider">
                            สิ่งของมงคล / อาวุธ (คั่นด้วยลูกน้ำ)
                        </label>
                        <input
                            type="text"
                            placeholder="เช่น ขนมโมทกะ, งา, บ่วงบาศ, ขวาน"
                            className="w-full bg-neutral-950 border border-neutral-800 text-white text-sm rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 px-3 py-2 outline-none"
                        />
                    </div>
                </div>

                {/* Footer: ลด Padding */}
                <div className="p-4 border-t border-neutral-800 flex justify-end gap-2 bg-neutral-900 rounded-b-xl">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-xs font-bold text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    >
                        ยกเลิก
                    </button>
                    <button className="bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold py-2 px-4 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer text-xs">
                        <FaFloppyDisk className="w-3.5 h-3.5" />
                        <span>บันทึกข้อมูล</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
