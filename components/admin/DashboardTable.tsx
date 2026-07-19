"use client";

import { FaPenToSquare, FaTrashCan, FaPlus } from "react-icons/fa6";

// ข้อมูลจำลอง (Mock Data) สำหรับทดสอบ UI แบบ Top-down
const mockGaneshas = [
    { id: 1, order: 1, nameTH: "พาละ คณปติ", nameEN: "Bala Ganapati", arms: 4 },
    {
        id: 2,
        order: 2,
        nameTH: "ตรุณ คณปติ",
        nameEN: "Taruna Ganapati",
        arms: 8,
    },
    {
        id: 3,
        order: 3,
        nameTH: "ภักติ คณปติ",
        nameEN: "Bhakti Ganapati",
        arms: 4,
    },
];

export default function DashboardTable() {
    return (
        <div className="w-full bg-neutral-900/80 border border-amber-900/30 rounded-2xl backdrop-blur-md shadow-2xl p-6 flex flex-col h-full animate-in fade-in slide-in-from-right-8 duration-700">
            {/* ส่วนหัวของตาราง */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-serif font-bold text-amber-500">
                        จัดการข้อมูลปาง
                    </h2>
                    <p className="text-sm text-neutral-400 mt-1">
                        รายชื่อพระคเณศทั้ง 32 ปางในระบบ
                    </p>
                </div>
                <button className="bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 transition-colors cursor-pointer text-sm">
                    <FaPlus className="w-4 h-4" />
                    <span>เพิ่มปางใหม่</span>
                </button>
            </div>

            {/* ตารางแสดงข้อมูล */}
            <div className="overflow-x-auto rounded-xl border border-neutral-800">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-neutral-950/80 border-b border-neutral-800 text-amber-500/80 text-xs uppercase tracking-wider">
                            <th className="p-4 font-semibold text-center w-16">
                                ลำดับ
                            </th>
                            <th className="p-4 font-semibold">
                                ชื่อปาง (ไทย / Eng)
                            </th>
                            <th className="p-4 font-semibold text-center w-24">
                                จำนวนกร
                            </th>
                            <th className="p-4 font-semibold text-center w-32">
                                จัดการ
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/50">
                        {mockGaneshas.map((ganesha) => (
                            <tr
                                key={ganesha.id}
                                className="hover:bg-neutral-800/30 transition-colors"
                            >
                                <td className="p-4 text-center text-neutral-400 font-mono">
                                    {ganesha.order.toString().padStart(2, "0")}
                                </td>
                                <td className="p-4">
                                    <p className="text-neutral-200 font-bold text-sm">
                                        {ganesha.nameTH}
                                    </p>
                                    <p className="text-neutral-500 text-xs italic font-serif">
                                        {ganesha.nameEN}
                                    </p>
                                </td>
                                <td className="p-4 text-center text-neutral-300 text-sm">
                                    {ganesha.arms}
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button className="p-2 rounded-lg bg-neutral-800 text-amber-500 hover:bg-amber-500 hover:text-neutral-900 transition-colors cursor-pointer">
                                            <FaPenToSquare className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 rounded-lg bg-neutral-800 text-red-500 hover:bg-red-500 hover:text-neutral-900 transition-colors cursor-pointer">
                                            <FaTrashCan className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* สถานะข้อมูล (Mock) */}
            <div className="mt-4 text-xs text-neutral-500 text-right">
                แสดงผล 3 จาก 32 รายการ
            </div>
        </div>
    );
}
