"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

// รับฟังก์ชันและค่าตัวเลขเข้ามา
interface FormNavigatorProps {
    onPrev: () => void;
    onNext: () => void;
    current: number;
    total: number;
}

export default function FormNavigator({
    onPrev,
    onNext,
    current,
    total,
}: FormNavigatorProps) {
    return (
        <div className="w-full max-w-2xl mx-auto mt-6 lg:mt-auto flex items-center justify-between lg:justify-start lg:gap-8 pt-4 lg:pt-8 pb-2 lg:pb-0 border-t border-amber-900/20 lg:border-t-0">
            {/* ปุ่มย้อนกลับ (Previous) ผูกกับ onPrev */}
            <button
                onClick={onPrev}
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-amber-700/40 flex items-center justify-center text-amber-500 hover:bg-amber-700/20 transition-all cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
            >
                <FaChevronLeft className="w-5 h-5 pr-1" />
            </button>

            {/* ตัวเลขบอกลำดับ (Counter) แบบ Dynamic */}
            <div className="flex flex-col items-center">
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest mb-1 hidden md:block">
                    เลื่อนเพื่อเปลี่ยนปาง
                </span>
                <span className="text-amber-400 font-serif font-bold tracking-widest text-sm lg:text-base">
                    {current} / {total}
                </span>
            </div>

            {/* ปุ่มถัดไป (Next) ผูกกับ onNext */}
            <button
                onClick={onNext}
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-amber-700/40 flex items-center justify-center text-amber-500 hover:bg-amber-700/20 transition-all cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
            >
                <FaChevronRight className="w-5 h-5 pl-1" />
            </button>
        </div>
    );
}
