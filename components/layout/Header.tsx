"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaOm, FaXmark } from "react-icons/fa6";
import LoginForm from "@/components/auth/LoginForm";

export default function Header() {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith("/admin");
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    return (
        <>
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

                {!isAdminPage && (
                    <div>
                        <button
                            onClick={() => setIsLoginModalOpen(true)}
                            className="text-xs px-4 py-2 rounded-lg bg-amber-700/20 border border-amber-700/50 text-amber-500 hover:bg-amber-700/40 transition-all cursor-pointer inline-block"
                        >
                            เข้าสู่ระบบ Admin
                        </button>
                    </div>
                )}
            </header>

            {isLoginModalOpen && (
                <div
                    // 1. เพิ่ม onClick ให้ฉากหลังสีดำ เพื่อปิด Modal
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 animate-in fade-in zoom-in-95 duration-300"
                    onClick={() => setIsLoginModalOpen(false)}
                >
                    <div
                        className="relative w-full max-w-md"
                        // 2. ดัก Event ไม่ให้ทะลุไปถึงฉากหลัง (ถ้าคลิกโดนตัวฟอร์ม จะได้ไม่ปิด)
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsLoginModalOpen(false)}
                            className="absolute -top-14 right-0 text-neutral-400 hover:text-amber-500 bg-neutral-900/80 p-3 rounded-full border border-neutral-700 transition-colors cursor-pointer shadow-lg"
                        >
                            <FaXmark className="w-5 h-5" />
                        </button>

                        <LoginForm
                            onLoginSuccess={() =>
                                (window.location.href = "/admin")
                            }
                        />
                    </div>
                </div>
            )}
        </>
    );
}
