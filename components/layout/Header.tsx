"use client";

import { useState } from "react";
import { FaOm } from "react-icons/fa6";

export default function Header() {
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <header className="w-full border-b border-amber-900/50 bg-neutral-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between z-50 relative">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-600/20 border border-amber-500/50 flex items-center justify-center text-amber-500">
                    <FaOm className="w-5 h-5" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-amber-500 tracking-tight font-serif">
                        Ganesha
                    </h1>
                    <p className="text-[10px] text-neutral-400 font-semibold tracking-widest uppercase">
                        The Digital Altar
                    </p>
                </div>
            </div>

            <div>
                {isAdmin ? (
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-amber-500 uppercase tracking-widest font-bold">
                            Admin Mode
                        </span>
                        <button
                            onClick={() => setIsAdmin(false)}
                            className="text-xs px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500 transition-all cursor-pointer"
                        >
                            ออกจากระบบ
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsAdmin(true)}
                        className="text-xs px-4 py-2 rounded-lg bg-amber-700/20 border border-amber-700/50 text-amber-500 hover:bg-amber-700/40 transition-all cursor-pointer"
                    >
                        เข้าสู่ระบบ Admin
                    </button>
                )}
            </div>
        </header>
    );
}
