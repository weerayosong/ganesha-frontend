"use client";

import { useState, useRef, useEffect } from "react";
import {
    FaLock,
    FaEye,
    FaEyeSlash,
    FaTriangleExclamation,
} from "react-icons/fa6";

interface LoginFormProps {
    onLoginSuccess?: () => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // 1. สร้าง Ref สำหรับช่อง Input
    const passwordInputRef = useRef<HTMLInputElement>(null);

    // 2. สั่งให้โฟกัสที่ช่อง Input ทันทีที่คอมโพเนนต์นี้ถูกเรียกขึ้นมาโชว์
    useEffect(() => {
        passwordInputRef.current?.focus();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                if (onLoginSuccess) {
                    onLoginSuccess();
                } else {
                    window.location.href = "/admin";
                }
            } else {
                const data = await res.json();
                setError(data.error || "รหัสผ่านไม่ถูกต้อง");
            }
        } catch (err) {
            console.error("Login Error:", err);
            setError("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-neutral-900/80 border border-amber-900/30 p-8 rounded-2xl backdrop-blur-md shadow-2xl animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-serif font-bold text-amber-500 mb-2">
                    Admin Access
                </h2>
                <p className="text-neutral-400 text-sm">
                    เข้าสู่ระบบเพื่อจัดการข้อมูล (Demo password: 1234)
                </p>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-950/50 border border-red-900/50 rounded-xl flex items-center gap-2 text-red-500 text-sm">
                    <FaTriangleExclamation className="w-4 h-4 shrink-0" />
                    <p>{error}</p>
                </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-5">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaLock className="text-neutral-500 w-4 h-4" />
                    </div>
                    <input
                        // 3. ผูก Ref เข้ากับ Input
                        ref={passwordInputRef}
                        type={showPassword ? "text" : "password"}
                        placeholder="Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 text-sm rounded-xl focus:ring-1 focus:ring-amber-500 focus:border-amber-500 block pl-11 pr-11 p-3.5 transition-colors outline-none disabled:opacity-50"
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

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold rounded-xl text-sm px-5 py-3.5 text-center transition-colors mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
                </button>
            </form>
        </div>
    );
}
