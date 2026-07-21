"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaChevronLeft, FaWandMagicSparkles } from "react-icons/fa6";

interface GaneshaData {
    _id: string;
    order: number;
    nameTH: string;
    nameEN: string;
    meaning: string;
    imageUrl?: string;
    prays: number;
}

const generateMantra = (nameTH: string) => {
    const prefix = nameTH.replace(/คเณศ|คณปติ/g, "").trim();
    return `โอม ศรี ${prefix}คณปตเย นะมะฮา`;
};

export default function ShelfPage() {
    const [savedGaneshas, setSavedGaneshas] = useState<GaneshaData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchShelfData = async () => {
            try {
                const shelfIds = JSON.parse(
                    localStorage.getItem("ganesha_shelf") || "[]",
                );

                if (shelfIds.length === 0) {
                    setIsLoading(false);
                    return;
                }

                const res = await fetch("/api/ganeshas");
                if (res.ok) {
                    const allGaneshas: GaneshaData[] = await res.json();
                    const myShelf = allGaneshas.filter((g) =>
                        shelfIds.includes(g._id),
                    );
                    setSavedGaneshas(myShelf);
                }
            } catch (error) {
                console.error("Error loading shelf:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchShelfData();
    }, []);

    const handleClearShelf = () => {
        const confirmClear = window.confirm(
            "ท่านต้องการอัญเชิญพระคเณศกลับ ใช่หรือไม่?",
        );
        if (confirmClear) {
            localStorage.removeItem("ganesha_shelf");
            setSavedGaneshas([]);
        }
    };

    return (
        <div className="fixed inset-0 w-full h-dvh bg-black text-white font-sans overflow-hidden z-45">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-amber-900/10 via-black to-black z-0 hidden md:block"></div>

            <div className="absolute top-24 left-6 md:top-28 md:left-10 z-50">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-neutral-300 hover:text-amber-500 transition-colors bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-full border border-neutral-700/50 shadow-lg"
                >
                    <FaChevronLeft className="w-3 h-3" />
                    <span className="text-sm font-medium">กลับ</span>
                </Link>
            </div>

            {savedGaneshas.length > 0 && (
                <button
                    onClick={handleClearShelf}
                    className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex items-center gap-2 bg-neutral-900/80 hover:bg-neutral-800 text-amber-400 hover:text-amber-300 px-5 py-3 rounded-full border border-amber-500/30 backdrop-blur-md transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] cursor-pointer group"
                >
                    {/* ใช้ไอคอนไม้คฑาวิเศษแทน */}
                    <FaWandMagicSparkles className="w-4 h-4 group-hover:animate-ping" />
                    <span className="text-sm font-medium tracking-wider hidden sm:inline">
                        อัญเชิญกลับ
                    </span>
                </button>
            )}

            {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="text-amber-500/80 animate-pulse tracking-widest text-lg pt-16">
                        กำลังอัญเชิญ...
                    </div>
                </div>
            ) : savedGaneshas.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pt-16">
                    <p className="text-neutral-500 mb-6 font-serif text-xl">
                        หิ้งพระยังว่างเปล่า
                    </p>
                    <Link
                        href="/"
                        className="bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold px-8 py-3 rounded-full transition-colors"
                    >
                        กลับไปอัญเชิญพระคเณศ
                    </Link>
                </div>
            ) : (
                <div className="w-full h-full flex flex-col md:flex-row md:justify-center md:items-center overflow-y-auto md:overflow-hidden snap-y md:snap-none snap-mandatory hide-scrollbar md:gap-6 lg:gap-10 relative z-10 pt-0 md:pt-16 md:px-10">
                    {savedGaneshas.map((ganesha) => (
                        <div
                            key={ganesha._id}
                            className="relative shrink-0 snap-start w-full h-dvh md:w-[30vw] md:max-w-100 md:h-[75vh] md:rounded-3xl overflow-hidden md:shadow-[0_0_40px_rgba(0,0,0,0.6)] md:border md:border-amber-900/40 bg-neutral-950"
                        >
                            {ganesha.imageUrl ? (
                                <>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={ganesha.imageUrl}
                                        alt={ganesha.nameTH}
                                        className="absolute inset-0 w-full h-full object-cover md:transition-transform md:duration-1000 md:hover:scale-105"
                                    />
                                </>
                            ) : (
                                <div className="absolute inset-0 bg-linear-to-b from-neutral-800 to-black"></div>
                            )}

                            {/* แก้ bg-gradient-to-t เป็น bg-linear-to-t */}
                            <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent md:opacity-90"></div>

                            <div className="absolute bottom-0 inset-x-0 p-8 md:p-8 flex flex-col justify-end text-center pb-24 md:pb-10 z-20">
                                <h2 className="text-4xl md:text-3xl lg:text-4xl font-serif font-bold text-amber-500 mb-2 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
                                    {ganesha.nameTH}
                                </h2>
                                <p className="text-neutral-300 font-serif italic text-base md:text-xs lg:text-sm mb-5 tracking-wider drop-shadow-lg">
                                    {ganesha.nameEN}
                                </p>

                                {/* แก้ h-[2px] เป็น h-0.5 */}
                                <div className="w-16 h-0.5 bg-amber-500/60 mx-auto mb-5"></div>

                                <p className="text-amber-400 text-xl md:text-lg lg:text-xl leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium tracking-wide">
                                    &quot;{generateMantra(ganesha.nameTH)}&quot;
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {savedGaneshas.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none text-white/50 text-[10px] tracking-widest uppercase animate-pulse md:hidden">
                    Scroll Down
                </div>
            )}
        </div>
    );
}
