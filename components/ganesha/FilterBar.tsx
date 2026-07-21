"use client";

import { FaBriefcase, FaCoins, FaHeart, FaBookOpen } from "react-icons/fa6";
import { BsStack } from "react-icons/bs";

interface FilterBarProps {
    activeFilter: string;
    onFilterChange: (filter: string) => void;
}

export default function FilterBar({
    activeFilter,
    onFilterChange,
}: FilterBarProps) {
    const filters = [
        { id: "all", label: "ทั้งหมด", icon: BsStack },
        { id: "work", label: "การงาน", icon: FaBriefcase },
        { id: "money", label: "การเงิน", icon: FaCoins },
        { id: "love", label: "ความรัก", icon: FaHeart },
        { id: "study", label: "การเรียน", icon: FaBookOpen },
    ];

    return (
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-4 mb-2 shrink-0">
            {filters.map((f) => (
                <button
                    key={f.id}
                    onClick={() => onFilterChange(f.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap border ${
                        activeFilter === f.id
                            ? "bg-amber-600 text-neutral-950 border-amber-500"
                            : "bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:text-amber-500 hover:border-amber-900/50"
                    }`}
                >
                    <f.icon className="w-3.5 h-3.5" />
                    {f.label}
                </button>
            ))}
        </div>
    );
}
