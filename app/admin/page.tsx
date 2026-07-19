"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import LoginForm from "@/components/auth/LoginForm";
import Logout from "@/components/auth/Logout";

export default function AdminPage() {
    // State ควบคุมสถานะการเข้าสู่ระบบ
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative p-6">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,var(--color-dark-900)_0%,var(--color-dark-950)_70%)] z-0"></div>

            <div className="relative z-10 w-full max-w-md flex flex-col">
                <div className="mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-amber-500 transition-colors"
                    >
                        <FaChevronLeft className="w-3 h-3" />
                        <span>กลับหน้าแรก</span>
                    </Link>
                </div>

                {/* สลับ Component ตามสถานะ */}
                {isLoggedIn ? (
                    <Logout onLogout={() => setIsLoggedIn(false)} />
                ) : (
                    <LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />
                )}
            </div>
        </div>
    );
}
