"use client";

import { FaRightFromBracket, FaUserShield } from "react-icons/fa6";

export default function Logout() {
    return (
        <div className="w-full max-w-md mx-auto bg-neutral-900/80 border border-amber-900/30 p-8 rounded-2xl backdrop-blur-md shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500">
            {/* ไอคอนสถานะ Admin */}
            <div className="w-16 h-16 bg-amber-900/20 rounded-full flex items-center justify-center mb-4 border border-amber-500/30">
                <FaUserShield className="w-8 h-8 text-amber-500" />
            </div>

            <h2 className="text-2xl font-serif font-bold text-white mb-2">
                Admin Logged In
            </h2>
            <p className="text-neutral-400 text-sm mb-8 leading-relaxed">
                คุณอยู่ในระบบในฐานะผู้ดูแล
                <br />
                สามารถเพิ่ม ลบ หรือแก้ไขข้อมูลปางต่างๆ ได้
            </p>

            {/* ปุ่ม Logout */}
            <button
                type="button"
                className="w-full bg-neutral-950 hover:bg-red-950/40 border border-red-900/50 text-red-500 hover:text-red-400 font-bold rounded-xl text-sm px-5 py-3.5 flex items-center justify-center gap-2 transition-colors cursor-pointer group"
            >
                <FaRightFromBracket className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>ออกจากระบบ</span>
            </button>
        </div>
    );
}
