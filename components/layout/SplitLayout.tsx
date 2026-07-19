import FlipCard from "@/components/ganesha/FlipCard";
import ContentArea from "@/components/ganesha/ContentArea";
import FilterBar from "@/components/ganesha/FilterBar";
import FormNavigator from "@/components/ganesha/FormNavigator";

export default function SplitLayout() {
    return (
        <div className="w-full h-full flex flex-col lg:flex-row relative">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,var(--color-dark-900)_0%,var(--color-dark-950)_70%)] z-0"></div>

            {/* ฝั่งซ้าย: 3D Card */}
            <section className="relative w-full lg:w-[50%] xl:w-[55%] h-[50dvh] lg:h-full flex items-center justify-center p-6 z-10 shrink-0">
                <FlipCard />
            </section>

            {/* ฝั่งขวา: ปุ่ม Action */}
            <section className="relative w-full lg:w-[50%] xl:w-[45%] h-[50dvh] lg:h-full flex flex-col px-6 pb-24 pt-4 lg:px-12 lg:py-6 z-20 overflow-y-auto hide-scrollbar border-t lg:border-t-0 lg:border-l border-amber-900/20 bg-neutral-950/90 backdrop-blur-xl lg:bg-transparent lg:backdrop-blur-none lg:justify-start xl:justify-center">
                <FilterBar />

                <ContentArea />

                <FormNavigator />
            </section>
        </div>
    );
}
