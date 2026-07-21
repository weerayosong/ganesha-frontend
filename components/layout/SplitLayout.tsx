"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import FlipCard from "@/components/ganesha/FlipCard";
import ContentArea from "@/components/ganesha/ContentArea";
import FilterBar from "@/components/ganesha/FilterBar";

interface SplitLayoutProps {
    initialData: {
        _id: string;
        order: number;
        nameTH: string;
        nameEN: string;
        meaning: string;
        color: string;
        vehicle: string;
        weapons: string;
        imageUrl?: string;
        mantra?: string;
        prays: number;
    }[];
}

export default function SplitLayout({ initialData }: SplitLayoutProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeFilter, setActiveFilter] = useState("all"); // 1. สร้าง State เก็บหมวดหมู่ปัจจุบัน

    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    if (!initialData || initialData.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center text-amber-500">
                กำลังโหลดข้อมูลปางพระคเณศ...
            </div>
        );
    }

    // 2. ลอจิกการกรองข้อมูลด้วย Keyword Matching (RegEx)
    const filteredData = initialData.filter((item) => {
        if (activeFilter === "all") return true;

        const meaning = item.meaning || "";
        if (activeFilter === "work")
            return /งาน|ธุรกิจ|ผู้นำ|บริหาร|สำเร็จ|ก้าวหน้า|แข่งขัน/i.test(
                meaning,
            );
        if (activeFilter === "money")
            return /เงิน|ทอง|มั่งคั่ง|ร่ำรวย|อุดมสมบูรณ์|ทรัพย์|โชคลาภ/i.test(
                meaning,
            );
        if (activeFilter === "love")
            return /รัก|คู่|เสน่ห์|เมตตา|ชีวิตคู่/i.test(meaning);
        if (activeFilter === "study")
            return /เรียน|ศึกษา|ปัญญา|ความรู้/i.test(meaning);

        return true;
    });

    // ป้องกัน Error กรณีที่กรองแล้วไม่เหลือข้อมูลเลย ให้กลับไปใช้ Array ต้นฉบับ
    const displayData = filteredData.length > 0 ? filteredData : initialData;
    const currentGanesha = displayData[currentIndex] || displayData[0];

    // ฟังก์ชันจัดการตอนกดเปลี่ยน Filter (ต้องรีเซ็ตหน้ากลับไปเริ่มใบที่ 1 เสมอ)
    const handleFilterChange = (filter: string) => {
        setActiveFilter(filter);
        setCurrentIndex(0);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev > 0 ? prev - 1 : displayData.length - 1,
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev < displayData.length - 1 ? prev + 1 : 0,
        );
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.touches[0].clientX);
        setTouchEnd(0);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const minSwipeDistance = 50;

        if (distance > minSwipeDistance) handleNext();
        if (distance < -minSwipeDistance) handlePrev();

        setTouchStart(0);
        setTouchEnd(0);
    };

    return (
        <div
            className="w-full h-full flex flex-col lg:flex-row relative touch-pan-y select-none overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,var(--color-dark-900)_0%,var(--color-dark-950)_70%)] z-0"></div>

            <div
                className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-50 text-amber-900/30 hover:text-amber-500 transition-colors cursor-pointer p-4"
                onClick={handlePrev}
            >
                <FaChevronLeft className="w-10 h-10 drop-shadow-lg" />
            </div>

            <div
                className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-50 text-amber-900/30 hover:text-amber-500 transition-colors cursor-pointer p-4"
                onClick={handleNext}
            >
                <FaChevronRight className="w-10 h-10 drop-shadow-lg" />
            </div>

            <section className="relative w-full lg:w-[50%] xl:w-[55%] h-[50dvh] lg:h-full flex items-center justify-center p-6 z-10 shrink-0">
                <FlipCard
                    key={currentGanesha._id}
                    image={
                        currentGanesha.imageUrl ||
                        "https://placehold.co/600x800/1a1a1a/d4af37?text=Ganesha"
                    }
                    mantra={currentGanesha.mantra}
                />
            </section>

            <section className="relative w-full lg:w-[50%] xl:w-[45%] h-[50dvh] lg:h-full flex flex-col px-6 pt-4 lg:px-12 lg:py-6 z-20 overflow-y-auto hide-scrollbar border-t lg:border-t-0 lg:border-l border-amber-900/20 bg-neutral-950/90 backdrop-blur-xl lg:bg-transparent lg:backdrop-blur-none lg:justify-start xl:justify-center">
                {/* 3. ส่ง Props ไปให้ FilterBar */}
                <FilterBar
                    activeFilter={activeFilter}
                    onFilterChange={handleFilterChange}
                />

                <ContentArea
                    data={currentGanesha}
                    currentIndex={currentIndex + 1}
                    total={displayData.length}
                />
            </section>
        </div>
    );
}
