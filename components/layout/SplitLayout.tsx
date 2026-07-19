"use client"; // ต้องเติม client directive เพราะมีการใช้ Touch Events (State)

import { useState } from "react";
import FlipCard from "@/components/ganesha/FlipCard";
import ContentArea from "@/components/ganesha/ContentArea";
import FilterBar from "@/components/ganesha/FilterBar";
import FormNavigator from "@/components/ganesha/FormNavigator";

export default function SplitLayout() {
    // State สำหรับจับระยะการ Swipe
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchEndX, setTouchEndX] = useState<number | null>(null);

    // กำหนดระยะขั้นต่ำที่ถือว่าเป็นการ Swipe (ป้องกันการเผลอแตะ)
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEndX(null);
        setTouchStartX(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEndX(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStartX || !touchEndX) return;
        const distance = touchStartX - touchEndX;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            console.log("> Swiped Left! (Next)");
            // เตรียมเรียกฟังก์ชัน Next
        }
        if (isRightSwipe) {
            console.log("< Swiped Right! (Prev)");
            // เตรียมเรียกฟังก์ชัน Prev
        }
    };

    return (
        <div
            className="w-full h-full flex flex-col lg:flex-row relative"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,var(--color-dark-900)_0%,var(--color-dark-950)_70%)] z-0"></div>

            <section className="relative w-full lg:w-[50%] xl:w-[55%] h-[50dvh] lg:h-full flex items-center justify-center p-6 z-10 shrink-0">
                <FlipCard />
            </section>

            <section className="relative w-full lg:w-[50%] xl:w-[45%] h-[50dvh] lg:h-full flex flex-col px-6 pb-24 pt-4 lg:px-12 lg:py-6 z-20 overflow-y-auto hide-scrollbar border-t lg:border-t-0 lg:border-l border-amber-900/20 bg-neutral-950/90 backdrop-blur-xl lg:bg-transparent lg:backdrop-blur-none lg:justify-start xl:justify-center">
                <FilterBar />
                <ContentArea />
                <FormNavigator />
            </section>
        </div>
    );
}
