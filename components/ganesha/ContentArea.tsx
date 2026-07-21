"use client";

import {
    FaHandsPraying,
    FaPlus,
    FaCircleInfo,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa6";

interface GaneshaData {
    order: number;
    nameTH: string;
    nameEN: string;
    meaning: string;
    color: string;
    weapons: string;
    vehicle: string;
}

export default function ContentArea({ data }: { data?: GaneshaData }) {
    if (!data) return null;

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
            {/* โซน Header ด้านบนที่เพิ่ม UX Guide */}
            <div className="flex justify-between items-start border-b border-amber-900/30 pb-2">
                <div>
                    <span className="text-amber-500 font-bold tracking-widest text-xs uppercase mb-1 block">
                        ปางที่ {data.order}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
                        {data.nameTH}
                    </h2>
                    <p className="text-neutral-400 font-serif text-base italic">
                        {data.nameEN}
                    </p>
                </div>

                <div className="flex flex-col items-end mt-1">
                    <div className="flex items-center gap-1.5 bg-neutral-900/60 px-3 py-1.5 rounded-full border border-neutral-800 text-neutral-400 shadow-sm">
                        <FaChevronLeft className="w-2.5 h-2.5" />
                        <span className="text-[10px] tracking-widest uppercase">
                            ปัดซ้าย-ขวาเพื่อเปลี่ยนปาง
                        </span>
                        <FaChevronRight className="w-2.5 h-2.5" />
                    </div>
                </div>
            </div>

            <div className="bg-neutral-900/50 border border-amber-900/20 rounded-xl p-3 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                    <FaCircleInfo className="w-3.5 h-3.5" />
                    <h3 className="font-semibold text-xs tracking-wide">
                        ความหมาย
                    </h3>
                </div>
                <p className="text-neutral-300 leading-relaxed text-sm whitespace-pre-line">
                    {data.meaning}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-3">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
                        ลักษณะ (วรรณะ)
                    </span>
                    <p className="text-sm text-neutral-200">{data.color}</p>
                </div>
                <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-3">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
                        พาหนะ / ท่าประทับ
                    </span>
                    <p className="text-sm text-neutral-200">{data.vehicle}</p>
                </div>
                <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-3 md:col-span-2">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
                        สิ่งของมงคล / อาวุธ
                    </span>
                    <p className="text-sm text-neutral-200">{data.weapons}</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-1">
                <button className="flex-1 bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer group">
                    <FaHandsPraying className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">สักการะขอพร</span>
                </button>
                <button className="flex-1 bg-neutral-900 hover:bg-neutral-800 border border-amber-700/50 text-amber-500 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer group">
                    <FaPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">อัญเชิญขึ้นหิ้ง</span>
                </button>
            </div>
        </div>
    );
}
