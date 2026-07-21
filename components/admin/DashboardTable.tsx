"use client";

import { useState, useEffect } from "react";
// เพิ่ม Import FaEye เข้ามาด้วย
import {
    FaPenToSquare,
    FaEyeSlash,
    FaEye,
    FaPlus,
    FaSpinner,
} from "react-icons/fa6";
import GaneshaFormModal from "./GaneshaFormModal";

interface GaneshaData {
    _id: string;
    order: number;
    nameTH: string;
    nameEN: string;
    prays: number;
    meaning?: string;
    color?: string;
    vehicle?: string;
    weapons?: string;
    isDeleted?: boolean; // เพิ่มฟิลด์นี้เข้ามาใน Interface
}

export default function DashboardTable() {
    const [ganeshas, setGaneshas] = useState<GaneshaData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [selectedGanesha, setSelectedGanesha] = useState<GaneshaData | null>(
        null,
    );

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

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchGaneshas();
    }, []);

    const openModal = (mode: "add" | "edit", ganeshaData?: GaneshaData) => {
        setModalMode(mode);
        setSelectedGanesha(ganeshaData || null);
        setIsModalOpen(true);
    };

    // ฟังก์ชันใหม่สำหรับสลับสถานะเปิด-ปิด
    const handleToggleVisibility = async (
        id: string,
        name: string,
        currentStatus: boolean = false,
    ) => {
        const actionText = currentStatus ? "นำกลับมาแสดง" : "ซ่อน";
        const confirmAction = window.confirm(
            `คุณต้องการ "${actionText}" ปาง "${name}" ใช่หรือไม่?`,
        );

        if (!confirmAction) return;

        try {
            // ส่งไปที่ API เส้น PATCH พร้อมแนบค่าสถานะตรงข้ามไปให้
            const res = await fetch(`/api/ganeshas/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isDeleted: !currentStatus }),
            });

            if (res.ok) {
                fetchGaneshas();
            } else {
                alert(`เกิดข้อผิดพลาดในการ${actionText}ข้อมูล`);
            }
        } catch (error) {
            console.error("Toggle Error:", error);
            alert("ไม่สามารถติดต่อเซิร์ฟเวอร์ได้");
        }
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
                                ganeshas.map((ganesha) => (
                                    <tr
                                        key={ganesha._id}
                                        // เงื่อนไข: ถ้าถูกซ่อนอยู่ให้พื้นหลังออกแดงนิดๆ
                                        className={`transition-colors ${ganesha.isDeleted ? "bg-red-950/20" : "hover:bg-neutral-800/30"}`}
                                    >
                                        <td
                                            className={`p-4 text-center font-mono ${ganesha.isDeleted ? "text-red-500/70" : "text-neutral-400"}`}
                                        >
                                            {ganesha.order
                                                .toString()
                                                .padStart(2, "0")}
                                        </td>
                                        <td className="p-4">
                                            <p
                                                className={`font-bold text-sm ${ganesha.isDeleted ? "text-red-500" : "text-neutral-200"}`}
                                            >
                                                {ganesha.nameTH}
                                                {ganesha.isDeleted && (
                                                    <span className="ml-2 text-[10px] bg-red-500/20 text-red-500 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                        ถูกซ่อน
                                                    </span>
                                                )}
                                            </p>
                                            <p
                                                className={`text-xs italic font-serif ${ganesha.isDeleted ? "text-red-500/70" : "text-neutral-500"}`}
                                            >
                                                {ganesha.nameEN}
                                            </p>
                                        </td>
                                        <td
                                            className={`p-4 text-center text-sm ${ganesha.isDeleted ? "text-red-500/70" : "text-neutral-300"}`}
                                        >
                                            {(
                                                ganesha.prays || 0
                                            ).toLocaleString()}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        openModal(
                                                            "edit",
                                                            ganesha,
                                                        )
                                                    }
                                                    className={`p-2 rounded-lg transition-colors cursor-pointer ${
                                                        ganesha.isDeleted
                                                            ? "bg-red-900/30 text-red-500 hover:bg-red-500 hover:text-white"
                                                            : "bg-neutral-800 text-amber-500 hover:bg-amber-500 hover:text-neutral-900"
                                                    }`}
                                                    title="แก้ไขข้อมูล"
                                                >
                                                    <FaPenToSquare className="w-4 h-4" />
                                                </button>

                                                {/* ปุ่ม Toggle */}
                                                <button
                                                    onClick={() =>
                                                        handleToggleVisibility(
                                                            ganesha._id,
                                                            ganesha.nameTH,
                                                            ganesha.isDeleted,
                                                        )
                                                    }
                                                    className={`p-2 rounded-lg transition-colors cursor-pointer ${
                                                        ganesha.isDeleted
                                                            ? "bg-red-900/30 text-red-500 hover:bg-red-500 hover:text-white"
                                                            : "bg-neutral-800 text-neutral-400 hover:bg-red-950/50 hover:text-red-500"
                                                    }`}
                                                    title={
                                                        ganesha.isDeleted
                                                            ? "นำกลับมาแสดง"
                                                            : "ซ่อนปางนี้"
                                                    }
                                                >
                                                    {ganesha.isDeleted ? (
                                                        <FaEye className="w-4 h-4" />
                                                    ) : (
                                                        <FaEyeSlash className="w-4 h-4" />
                                                    )}
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
                initialData={selectedGanesha}
            />
        </>
    );
}
