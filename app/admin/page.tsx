"use client";

// import Link from "next/link";
// import { FaChevronLeft } from "react-icons/fa6";
import Logout from "@/components/auth/Logout";
import DashboardTable from "@/components/admin/DashboardTable";

export default function AdminPage() {
    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            window.location.href = "/";
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <>
            {/* แทรก CSS เพื่อปลดล็อค Global Scrollbar เฉพาะหน้า Admin */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                /* ปลดล็อค body ที่ถูกตั้งค่ามาจาก globals.css และ layout.tsx */
                body {
                    overflow: auto !important;
                    height: auto !important;
                }
                /* ปลดล็อคกล่อง wrapper ที่ครอบมาจาก layout.tsx */
                body > div.overflow-hidden {
                    overflow: visible !important;
                    height: auto !important;
                }
            `,
                }}
            />

            <div className="w-full min-h-dvh relative p-4 md:p-6 bg-black text-white font-sans flex flex-col items-center">
                <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,var(--color-dark-900)_0%,var(--color-dark-950)_70%)] z-0"></div>

                <div className="relative z-10 w-full max-w-6xl mt-2 md:mt-4">
                    {/* <div className="mb-6">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-amber-500 transition-colors bg-neutral-900/50 px-4 py-2 rounded-full border border-neutral-800 w-fit cursor-pointer"
                        >
                            <FaChevronLeft className="w-3 h-3" />
                            <span>กลับหน้าแรก</span>
                        </Link>
                    </div> */}

                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 w-full">
                        <div className="w-full lg:w-1/3 xl:w-1/4">
                            <Logout onLogout={handleLogout} />
                        </div>

                        <div className="w-full lg:w-2/3 xl:w-3/4 pb-20">
                            <div className="mb-6 lg:mb-8">
                                <h1 className="text-2xl md:text-4xl font-serif font-bold text-amber-500 mb-2">
                                    Admin Dashboard
                                </h1>
                                <p className="text-sm md:text-base text-neutral-400">
                                    ระบบจัดการข้อมูลปางพระคเณศ
                                </p>
                            </div>

                            <DashboardTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
