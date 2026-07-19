"use client";

import { useState } from "react";
import {
    FaLock,
    FaUser,
    FaEye,
    FaEyeSlash,
    FaTriangleExclamation,
} from "react-icons/fa6";

// รับ Props ฟังก์ชันจากหน้าหลักเพื่อสั่งเปลี่ยนสถานะเมื่อล็อกอินผ่าน
interface LoginFormProps {
    onLoginSuccess?: () => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
    const [showPassword, setShowPassword] = useState(false);

    // State สำหรับเก็บข้อมูลการพิมพ์และแจ้งเตือน
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault(); // ป้องกันฟอร์มรีเฟรชหน้าเว็บ
        setError(""); // เคลียร์ Error เดิมก่อนเช็คใหม่

        // ตรวจสอบเงื่อนไข (Mock Auth)
        if (username === "demo" && password === "demo") {
            if (onLoginSuccess) onLoginSuccess();
        } else {
            setError("Username หรือ Password ไม่ถูกต้อง");
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-neutral-900/80 border border-amber-900/30 p-8 rounded-2xl backdrop-blur-md shadow-2xl animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-serif font-bold text-amber-500 mb-2">
                    Admin Access
                </h2>
                <p className="text-neutral-400 text-sm">
                    เข้าสู่ระบบเพื่อจัดการข้อมูล
                </p>
            </div>

            <div className="mb-6 p-3 bg-amber-900/10 border border-dashed border-amber-700/40 rounded-xl text-center">
                <p className="text-[11px] text-amber-500/70 uppercase tracking-widest mb-1">
                    Demo Account
                </p>
                <p className="text-sm text-amber-400 font-mono tracking-wider">
                    User: <span className="text-white">demo</span>{" "}
                    <span className="mx-2 text-amber-900/50">|</span> Pass:{" "}
                    <span className="text-white">demo</span>
                </p>
            </div>

            {/* กล่องแสดงข้อความ Error (ถ้ามี) */}
            {error && (
                <div className="mb-4 p-3 bg-red-950/50 border border-red-900/50 rounded-xl flex items-center gap-2 text-red-500 text-sm">
                    <FaTriangleExclamation className="w-4 h-4 shrink-0" />
                    <p>{error}</p>
                </div>
            )}

            {/* เปลี่ยนเป็น onSubmit */}
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaUser className="text-neutral-500 w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 text-sm rounded-xl focus:ring-1 focus:ring-amber-500 focus:border-amber-500 block pl-11 p-3.5 transition-colors outline-none"
                    />
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaLock className="text-neutral-500 w-4 h-4" />
                    </div>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 text-sm rounded-xl focus:ring-1 focus:ring-amber-500 focus:border-amber-500 block pl-11 pr-11 p-3.5 transition-colors outline-none"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-neutral-500 hover:text-amber-500 transition-colors"
                    >
                        {showPassword ? (
                            <FaEyeSlash className="w-4 h-4" />
                        ) : (
                            <FaEye className="w-4 h-4" />
                        )}
                    </button>
                </div>

                {/* เปลี่ยน type เป็น submit */}
                <button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold rounded-xl text-sm px-5 py-3.5 text-center transition-colors mt-2 cursor-pointer"
                >
                    เข้าสู่ระบบ
                </button>
            </form>
        </div>
    );
}
