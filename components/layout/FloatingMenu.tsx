"use client";

import Link from "next/link";
import { FaVihara } from "react-icons/fa6";

export default function FloatingMenu() {
    return (
        // มือถือ: ลอยตรงกลางด้านล่าง (bottom-6 left-1/2 -translate-x-1/2)
        // จอใหญ่ (md ขึ้นไป): ย้ายไปลอยขวาล่าง (md:bottom-8 md:right-8 md:left-auto md:translate-x-0)
        <div className="fixed top-[30dvh] right-8 md:top-auto md:bottom-8 md:right-8 z-50 animate-in fade-in duration-700">
            <Link
                href="/shelf"
                className="flex items-center justify-center bg-linear-to-r from-amber-700 to-amber-500 hover:from-amber-600 hover:to-amber-400 text-neutral-950 shadow-lg shadow-amber-900/30 transition-transform hover:scale-105 rounded-full w-14 h-14 md:w-auto md:h-auto md:px-5 md:py-2.5 md:gap-2"
                title="หิ้งพระส่วนตัว"
            >
                {/* ไอคอนจะใหญ่ขึ้นนิดนึงบนมือถือ และเล็กลงให้สมดุลกับตัวหนังสือบนจอใหญ่ */}
                <FaVihara className="w-6 h-6 md:w-4 md:h-4" />

                {/* ซ่อนข้อความในจอมือถือ และแสดงในจอใหญ่ */}
                <span className="hidden md:inline font-bold tracking-wider text-sm">
                    หิ้งพระส่วนตัว
                </span>
            </Link>
        </div>
    );
}
