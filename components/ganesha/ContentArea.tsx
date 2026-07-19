"use client";

import { FaHandsPraying, FaPlus, FaCircleInfo } from "react-icons/fa6";

interface GaneshaData {
    order: number;
    nameTH: string;
    nameEN: string;
    meaning: string;
    skinColor: string;
    arms: number;
    weapons: string[];
    vahana_or_posture: string;
}

const mockData: GaneshaData = {
    order: 3,
    nameTH: "ภักติ คณปติ",
    nameEN: "Bhakti Ganapati",
    meaning: "ปางบูชาเพื่อความสมบูรณ์เติมเต็มของชีวิต",
    skinColor: "สีขาวบริสุทธิ์ดั่งพระจันทร์เต็มดวง",
    arms: 4,
    weapons: ["ลูกมะพร้าว", "กล้วย", "ผลมะม่วง", "ถ้วยข้าวปาส"],
    vahana_or_posture: "ประทับนั่งขัดสมาธิ",
};

export default function ContentArea({
    data = mockData,
}: {
    data?: GaneshaData;
}) {
    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <div className="border-b border-amber-900/30 pb-2">
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

            <div className="bg-neutral-900/50 border border-amber-900/20 rounded-xl p-3 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                    <FaCircleInfo className="w-3.5 h-3.5" />
                    <h3 className="font-semibold text-xs tracking-wide">
                        ความหมาย
                    </h3>
                </div>
                <p className="text-neutral-300 leading-relaxed text-sm">
                    {data.meaning}
                </p>
            </div>

            {/* Grid ที่ถูกยุบรวมให้กระชับขึ้น */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-3">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
                        ลักษณะ (วรรณะ / กร)
                    </span>
                    <p className="text-sm text-neutral-200">
                        {data.skinColor} • {data.arms} กร
                    </p>
                </div>
                <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-3">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
                        พาหนะ / ท่าประทับ
                    </span>
                    <p className="text-sm text-neutral-200">
                        {data.vahana_or_posture}
                    </p>
                </div>
                <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-3 md:col-span-2">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
                        สิ่งของมงคล / อาวุธ
                    </span>
                    <p className="text-sm text-neutral-200">
                        {data.weapons.join(", ")}
                    </p>
                </div>
            </div>

            {/* ลด py-4 เหลือ py-3 */}
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
