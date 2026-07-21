"use client";

import { useState, useEffect } from "react";
import {
    FaHandsPraying,
    FaPlus,
    FaCircleInfo,
    FaChevronLeft,
    FaChevronRight,
    FaCheck,
} from "react-icons/fa6";
import confetti from "canvas-confetti";

interface GaneshaData {
    _id: string;
    order: number;
    nameTH: string;
    nameEN: string;
    meaning: string;
    color: string;
    weapons: string;
    vehicle: string;
    prays: number; // <--- เพิ่ม prays
}

interface ContentAreaProps {
    data?: GaneshaData;
    currentIndex: number;
    total: number;
}

export default function ContentArea({
    data,
    currentIndex,
    total,
}: ContentAreaProps) {
    const [shelf, setShelf] = useState<string[]>([]);

    // State สำหรับเก็บยอดสักการะแบบ Real-time บนหน้าจอ
    const [prayCount, setPrayCount] = useState(0);

    useEffect(() => {
        const savedShelf = JSON.parse(
            localStorage.getItem("ganesha_shelf") || "[]",
        );
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShelf(savedShelf);
    }, []);

    // อัปเดตตัวเลขเมื่อปัดเปลี่ยนปาง
    useEffect(() => {
        if (data) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPrayCount(data.prays || 0);
        }
    }, [data]);

    const isOnShelf = data ? shelf.includes(data._id) : false;

    if (!data) return null;

    const handlePray = async () => {
        // 1. ยิง Effect ทันที
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#FFD700", "#FFA500", "#FF8C00"],
        });

        // 2. บวกเลขบนหน้าจอทันที ไม่ต้องรอ Database (Optimistic UI)
        setPrayCount((prev) => prev + 1);

        // 3. ยิง API ไปอัปเดตหลังบ้านแบบเงียบๆ
        try {
            await fetch("/api/pray", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: data._id }),
            });
        } catch (error) {
            console.error("Failed to pray:", error);
        }
    };

    const MAX_SHELF_LIMIT = 3; // จำกัดการอัญเชิญสูงสุด 3 ปาง

    const handleToggleShelf = () => {
        let newShelf;

        if (isOnShelf) {
            newShelf = shelf.filter((id) => id !== data._id);
            setShelf(newShelf);
            localStorage.setItem("ganesha_shelf", JSON.stringify(newShelf));
        } else {
            // เช็ค Limit ก่อนเพิ่ม
            if (shelf.length >= MAX_SHELF_LIMIT) {
                // UI แจ้งเตือนแบบ Custom เล็กๆ ใช้ alert ธรรมดาไปก่อน
                alert(
                    `พื้นที่หิ้งพระเต็มแล้ว\nท่านสามารถอัญเชิญได้สูงสุด ${MAX_SHELF_LIMIT} ปาง\nกรุณาอัญเชิญปางอื่นลงจากหิ้งก่อนครับ`,
                );
                return;
            }

            newShelf = [...shelf, data._id];
            setShelf(newShelf);
            localStorage.setItem("ganesha_shelf", JSON.stringify(newShelf));

            confetti({
                particleCount: 40,
                spread: 50,
                origin: { y: 0.8 },
                colors: ["#4CAF50", "#8BC34A"],
            });
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
            <div className="flex justify-between items-start border-b border-amber-900/30 pb-2">
                <div>
                    <span className="text-amber-500 font-bold tracking-widest text-xs uppercase mb-1 block">
                        ปางที่ {data.order}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
                        {data.nameTH}
                    </h2>
                    <p className="text-neutral-400 font-serif text-base italic">
                        {data.nameEN}
                    </p>
                </div>

                <div className="flex flex-col items-end gap-1.5 mt-1">
                    <span className="text-amber-500/80 font-serif text-sm tracking-wider pr-1">
                        {currentIndex}{" "}
                        <span className="text-neutral-600 mx-1">/</span> {total}
                    </span>

                    <div className="flex items-center gap-1.5 bg-neutral-900/60 px-3 py-1.5 rounded-full border border-neutral-800 text-neutral-400 shadow-sm">
                        <FaChevronLeft className="w-2.5 h-2.5" />
                        <span className="text-[10px] tracking-widest uppercase">
                            ปัดเพื่อเปลี่ยน
                        </span>
                        <FaChevronRight className="w-2.5 h-2.5" />
                    </div>
                </div>
            </div>

            <div className="bg-neutral-900/50 border border-amber-900/20 rounded-xl p-3 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                    <FaCircleInfo className="w-3.5 h-3.5" />
                    <h3 className="font-semibold text-xs tracking-wide">
                        ความหมาย
                    </h3>
                </div>
                <p className="text-neutral-300 leading-relaxed text-sm whitespace-pre-line">
                    {data.meaning}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-3">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
                        ลักษณะ (วรรณะ)
                    </span>
                    <p className="text-sm text-neutral-200">{data.color}</p>
                </div>
                <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-3">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
                        พาหนะ / ท่าประทับ
                    </span>
                    <p className="text-sm text-neutral-200">{data.vehicle}</p>
                </div>
                <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-3 md:col-span-2">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
                        สิ่งของมงคล / อาวุธ
                    </span>
                    <p className="text-sm text-neutral-200">{data.weapons}</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-1">
                <button
                    onClick={handlePray}
                    className="flex-1 bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer group relative overflow-hidden"
                >
                    <FaHandsPraying className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">สักการะขอพร</span>
                    {/* แสดงตัวเลขยอดสักการะในปุ่ม */}
                    {prayCount > 0 && (
                        <span className="text-[10px] bg-neutral-950/20 px-2 py-0.5 rounded-full ml-1 font-sans">
                            {prayCount.toLocaleString()}
                        </span>
                    )}
                </button>

                <button
                    onClick={handleToggleShelf}
                    className={`flex-1 border font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer group ${
                        isOnShelf
                            ? "bg-amber-900/30 border-amber-500/50 text-amber-500"
                            : "bg-neutral-900 hover:bg-neutral-800 border-amber-700/50 text-amber-500"
                    }`}
                >
                    {isOnShelf ? (
                        <>
                            <FaCheck className="w-4 h-4" />
                            <span className="text-sm">อยู่บนหิ้งแล้ว</span>
                        </>
                    ) : (
                        <>
                            <FaPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            <span className="text-sm">อัญเชิญขึ้นหิ้ง</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
