"use client";

import { useState } from "react";
import {
    FaLayerGroup,
    FaBriefcase,
    FaCoins,
    FaHeart,
    FaBookOpen,
} from "react-icons/fa6";

// กำหนดหมวดหมู่จำลอง (ปรับเหลือ 5 หมวดหมู่เพื่อความสวยงามของ UI)
const categories = [
    { id: "all", name: "ทั้งหมด", icon: FaLayerGroup },
    { id: "success", name: "การงาน", icon: FaBriefcase },
    { id: "wealth", name: "การเงิน", icon: FaCoins },
    { id: "love", name: "ความรัก", icon: FaHeart },
    { id: "education", name: "การเรียน", icon: FaBookOpen },
];

export default function FilterBar() {
    // State สำหรับเก็บหมวดหมู่ที่ถูกเลือก (เริ่มต้นที่ "all")
    const [activeCategory, setActiveCategory] = useState("all");

    return (
        <div className="w-full max-w-2xl mx-auto mb-6">
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2 pt-1 px-1">
                {categories.map((category) => {
                    const Icon = category.icon;
                    const isActive = activeCategory === category.id;

                    return (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 border text-sm font-semibold cursor-pointer ${
                                isActive
                                    ? "bg-amber-600 border-amber-500 text-neutral-950 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                                    : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-amber-500 hover:border-amber-900/50"
                            }`}
                        >
                            <Icon
                                className={
                                    isActive ? "text-neutral-950" : "opacity-70"
                                }
                            />
                            <span>{category.name}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
