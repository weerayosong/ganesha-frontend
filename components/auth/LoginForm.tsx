"use client";

import { FaLock, FaUser } from "react-icons/fa6";

export default function LoginForm() {
    return (
        <div className="w-full max-w-md mx-auto bg-neutral-900/80 border border-amber-900/30 p-8 rounded-2xl backdrop-blur-md shadow-2xl animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-serif font-bold text-amber-500 mb-2">
                    Admin Access
                </h2>
                <p className="text-neutral-400 text-sm">
                    เข้าสู่ระบบเพื่อจัดการข้อมูล
                </p>
            </div>

            <form className="flex flex-col gap-5">
                {/* ช่องกรอก Username */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaUser className="text-neutral-500 w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 text-sm rounded-xl focus:ring-1 focus:ring-amber-500 focus:border-amber-500 block pl-11 p-3.5 transition-colors outline-none"
                    />
                </div>

                {/* ช่องกรอก Password */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaLock className="text-neutral-500 w-4 h-4" />
                    </div>
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 text-sm rounded-xl focus:ring-1 focus:ring-amber-500 focus:border-amber-500 block pl-11 p-3.5 transition-colors outline-none"
                    />
                </div>

                {/* ปุ่ม Login */}
                <button
                    type="button"
                    className="w-full bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold rounded-xl text-sm px-5 py-3.5 text-center transition-colors mt-2 cursor-pointer"
                >
                    เข้าสู่ระบบ
                </button>
            </form>
        </div>
    );
}
