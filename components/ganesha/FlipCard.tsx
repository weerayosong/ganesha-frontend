"use client";

import { useState } from "react";
import { FaWandMagicSparkles, FaArrowsUpDown } from "react-icons/fa6";
import Image from "next/image";

interface FlipCardProps {
    image?: string;
    mantra?: string;
}

export default function FlipCard({
    image = "https://placehold.co/600x800/1a1a1a/d4af37?text=Ganesha",
    mantra = "โอม ศรี คณปติ ยะนะมะฮา",
}: FlipCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    // State จับการ Swipe ขึ้น-ลง
    const [touchYStart, setTouchYStart] = useState(0);
    const [touchYEnd, setTouchYEnd] = useState(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchYStart(e.touches[0].clientY);
        setTouchYEnd(0);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchYEnd(e.touches[0].clientY);
    };

    const handleTouchEnd = () => {
        if (!touchYStart || !touchYEnd) return;
        const distance = touchYStart - touchYEnd;
        // ถ้าปัดขึ้นหรือลงเกิน 40px ให้พลิกการ์ด
        if (Math.abs(distance) > 40) {
            setIsFlipped(!isFlipped);
        }
        setTouchYStart(0);
        setTouchYEnd(0);
    };

    return (
        <div
            // เพิ่ม touch-none เพื่อป้องกันไม่ให้เบราว์เซอร์ไป scroll ตอนกำลังปัดที่ตัวการ์ด
            className="relative w-full max-w-55 md:max-w-70 lg:max-w-md flex justify-center items-center aspect-3/4 perspective-1000 cursor-pointer group select-none touch-none"
            onClick={() => setIsFlipped(!isFlipped)} // จิ้มแบบปกติ (Click) ก็ยังทำได้อยู่
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="absolute -inset-4 bg-amber-700/20 blur-3xl rounded-full opacity-50 transition-colors duration-700"></div>

            <div
                className={`w-[90%] h-[90%] relative duration-700 preserve-3d transition-transform rounded-2xl shadow-2xl shadow-black/80 ${isFlipped ? "rotate-y-180" : ""}`}
            >
                {/* ด้านหน้าการ์ด (รูปภาพ) */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden border border-amber-700/40 bg-neutral-900">
                    <Image
                        src={image}
                        alt="Ganesha"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>

                    <div className="absolute w-[90%] bottom-2 left-1/2 -translate-x-1/2 bg-black/60 px-3 py-1.5 rounded-full border border-amber-700/40 backdrop-blur-md opacity-70 flex items-center justify-center gap-2">
                        <FaArrowsUpDown className="w-2.5 h-2.5 text-amber-400" />
                        <span className="text-[9px] text-amber-200 tracking-widest uppercase">
                            ปัดขึ้น-ลง เพื่อพลิกการ์ด
                        </span>
                    </div>
                </div>

                {/* ด้านหลังการ์ด (คาถาบูชา) */}
                <div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-2xl border border-amber-500/50 bg-neutral-950 rotate-y-180 flex flex-col items-center justify-center p-8 text-center"
                    style={{
                        backgroundImage:
                            "radial-gradient(ellipse at center, #2a2010 0%, #0a0a0a 100%)",
                    }}
                >
                    <FaWandMagicSparkles className="w-8 h-8 text-amber-500 mb-6 opacity-50" />
                    <h3 className="text-sm font-semibold text-neutral-400 tracking-widest uppercase mb-4">
                        คาถาบูชา
                    </h3>
                    <p className="text-lg md:text-2xl font-serif text-amber-300 leading-relaxed italic drop-shadow-md">
                        {mantra}
                    </p>
                </div>
            </div>
        </div>
    );
}
