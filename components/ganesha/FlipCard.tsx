"use client";

import { useState } from "react";
import { FaArrowRotateRight, FaWandMagicSparkles } from "react-icons/fa6";
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

    return (
        <div
            className="relative w-full max-w-55 md:max-w-70 lg:max-w-md flex justify-center items-center aspect-3/4 perspective-1000 cursor-pointer group"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            {/* ออร่าด้านหลังการ์ด */}
            <div className="absolute -inset-4 bg-amber-700/20 blur-3xl rounded-full opacity-50 transition-colors duration-700"></div>

            {/* กล่องบรรจุการ์ด (ใส่เอฟเฟกต์ 3D Flip) */}
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

                    {/* ไอคอนพลิกการ์ด (มุมขวาล่าง) */}
                    <div className="absolute bottom-4 right-4 bg-black/60 p-2.5 rounded-full border border-amber-700/50 backdrop-blur-md transition-transform group-hover:scale-110">
                        <FaArrowRotateRight className="w-4 h-4 text-amber-400" />
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
