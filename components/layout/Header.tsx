"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaOm } from "react-icons/fa6";

export default function Header() {
    // ใช้ usePathname เพื่อเช็คว่าปัจจุบันอยู่หน้าไหน
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith("/admin");

    return (
        <header className="w-full border-b border-amber-900/50 bg-neutral-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between z-50 relative shrink-0">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-600/20 border border-amber-500/50 flex items-center justify-center text-amber-500">
                    <FaOm className="w-5 h-5" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-amber-500 tracking-tight font-serif">
                        Ganesha
                    </h1>
                    <p className="text-[10px] text-neutral-400 font-semibold tracking-widest uppercase">
                        Om Shri Ganeshaya Namaha
                    </p>
                </div>
            </div>

            {/* ถ้าไม่ได้อยู่หน้า Admin ให้แสดงปุ่มทางเข้า */}
            {!isAdminPage && (
                <div>
                    <Link
                        href="/admin"
                        className="text-xs px-4 py-2 rounded-lg bg-amber-700/20 border border-amber-700/50 text-amber-500 hover:bg-amber-700/40 transition-all cursor-pointer inline-block"
                    >
                        เข้าสู่ระบบ Admin
                    </Link>
                </div>
            )}
        </header>
    );
}
