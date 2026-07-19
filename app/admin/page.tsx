"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import LoginForm from "@/components/auth/LoginForm";
import Logout from "@/components/auth/Logout";
import DashboardTable from "@/components/admin/DashboardTable";

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center relative p-6 overflow-y-auto hide-scrollbar">
            {/* พื้นหลัง */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,var(--color-dark-900)_0%,var(--color-dark-950)_70%)] z-0"></div>

            {/* Container หลัก: จะขยายกว้างขึ้นเมื่อล็อกอินสำเร็จ */}
            <div
                className={`relative z-10 w-full flex flex-col transition-all duration-700 ${isLoggedIn ? "max-w-6xl mt-12 mb-12" : "max-w-md"}`}
            >
                <div className="mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-amber-500 transition-colors"
                    >
                        <FaChevronLeft className="w-3 h-3" />
                        <span>กลับหน้าแรก</span>
                    </Link>
                </div>

                {isLoggedIn ? (
                    // แสดง Layout แบบแบ่ง 2 คอลัมน์เมื่อเข้าสู่ระบบ
                    <div className="flex flex-col lg:flex-row gap-6 w-full items-start">
                        {/* ฝั่งซ้าย: แผงโปรไฟล์และปุ่มออกระบบ */}
                        <div className="w-full lg:w-1/3 xl:w-1/4 shrink-0">
                            <Logout onLogout={() => setIsLoggedIn(false)} />
                        </div>

                        {/* ฝั่งขวา: ตารางจัดการข้อมูล */}
                        <div className="w-full lg:w-2/3 xl:w-3/4">
                            <DashboardTable />
                        </div>
                    </div>
                ) : (
                    // แสดงแค่ฟอร์มล็อกอินเมื่อยังไม่เข้าระบบ
                    <LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />
                )}
            </div>
        </div>
    );
}
