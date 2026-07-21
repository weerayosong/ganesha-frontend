"use client";

import { useState, useEffect } from "react";
import { FaPenToSquare, FaEyeSlash, FaPlus, FaSpinner } from "react-icons/fa6";
import GaneshaFormModal from "./GaneshaFormModal";

// สร้าง Interface ให้ตรงกับโครงสร้าง Database
interface GaneshaData {
    _id: string;
    order: number;
    nameTH: string;
    nameEN: string;
    prays: number;
}

export default function DashboardTable() {
    // State สำหรับเก็บข้อมูลจาก Database และสถานะการโหลด
    const [ganeshas, setGaneshas] = useState<GaneshaData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");

    // ฟังก์ชันดึงข้อมูลจาก API
    const fetchGaneshas = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/ganeshas");
            if (res.ok) {
                const data = await res.json();
                setGaneshas(data);
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setIsLoading(false);
        }
    };

    // สั่งให้ดึงข้อมูลทันทีเมื่อโหลด Component นี้เสร็จ
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchGaneshas();
    }, []);

    const openModal = (mode: "add" | "edit") => {
        setModalMode(mode);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="w-full bg-neutral-900/80 border border-amber-900/30 rounded-2xl backdrop-blur-md shadow-2xl p-6 flex flex-col h-full animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h2 className="text-xl font-serif font-bold text-amber-500">
                            จัดการข้อมูลปาง
                        </h2>
                        <p className="text-sm text-neutral-400 mt-1">
                            รายชื่อพระคเณศทั้ง 32 ปางในระบบ
                        </p>
                    </div>
                    <button
                        onClick={() => openModal("add")}
                        className="bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 transition-colors cursor-pointer text-sm"
                    >
                        <FaPlus className="w-4 h-4" />
                        <span>เพิ่มปางใหม่</span>
                    </button>
                </div>

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
                                <th className="p-4 font-semibold text-center w-32">
                                    จำนวนสักการะ
                                </th>
                                <th className="p-4 font-semibold text-center w-32">
                                    จัดการ
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800/50">
                            {/* แสดงสถานะตอนกำลังโหลด */}
                            {isLoading ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="p-8 text-center text-neutral-500"
                                    >
                                        <div className="flex flex-col items-center gap-3">
                                            <FaSpinner className="w-6 h-6 animate-spin text-amber-500" />
                                            <span>กำลังโหลดข้อมูล...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : ganeshas.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="p-8 text-center text-neutral-500"
                                    >
                                        ไม่พบข้อมูลปางในระบบ
                                    </td>
                                </tr>
                            ) : (
                                /* ลูปแสดงข้อมูลจริงจาก Database */
                                ganeshas.map((ganesha) => (
                                    <tr
                                        key={ganesha._id}
                                        className="hover:bg-neutral-800/30 transition-colors"
                                    >
                                        <td className="p-4 text-center text-neutral-400 font-mono">
                                            {ganesha.order
                                                .toString()
                                                .padStart(2, "0")}
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
                                            {(
                                                ganesha.prays || 0
                                            ).toLocaleString()}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        openModal("edit")
                                                    }
                                                    className="p-2 rounded-lg bg-neutral-800 text-amber-500 hover:bg-amber-500 hover:text-neutral-900 transition-colors cursor-pointer"
                                                    title="แก้ไขข้อมูล"
                                                >
                                                    <FaPenToSquare className="w-4 h-4" />
                                                </button>
                                                <button
                                                    className="p-2 rounded-lg bg-neutral-800 text-neutral-400 hover:bg-red-950/50 hover:text-red-500 transition-colors cursor-pointer"
                                                    title="ซ่อนปางนี้ (Soft Delete)"
                                                >
                                                    <FaEyeSlash className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 text-xs text-neutral-500 text-right">
                    แสดงผล {ganeshas.length} รายการ
                </div>
            </div>

            <GaneshaFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode={modalMode}
                onSuccess={fetchGaneshas}
            />
        </>
    );
}
