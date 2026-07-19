import { FaLayerGroup, FaFileLines } from "react-icons/fa6";

export default function SplitLayout() {
    return (
        <div className="w-full h-full flex flex-col lg:flex-row relative">
            {/* พื้นหลังรัศมีวง ๆ */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,var(--color-dark-900)_0%,var(--color-dark-950)_70%)] z-0"></div>

            {/* ฝั่งซ้าย: พื้นที่สำหรับ 3DCard */}
            <section className="relative w-full lg:w-[50%] xl:w-[55%] h-[50dvh] lg:h-full flex items-center justify-center p-6 z-10 shrink-0">
                {/* Placeholder รอประกอบ Component จริง */}
                <div className="text-amber-500/50 border border-dashed border-amber-500/30 p-12 rounded-2xl flex flex-col items-center gap-4 w-full max-w-sm">
                    <FaLayerGroup className="w-10 h-10" />
                    <p className="text-sm tracking-widest uppercase font-semibold">
                        3D Card Area
                    </p>
                </div>
            </section>

            {/* ฝั่งขวา: พื้นที่สำหรับข้อมูลและปุ่ม Action */}
            <section className="relative w-full lg:w-[50%] xl:w-[45%] h-[50dvh] lg:h-full flex flex-col px-6 pb-24 pt-4 lg:p-16 z-20 overflow-y-auto hide-scrollbar border-t lg:border-t-0 lg:border-l border-amber-900/20 bg-neutral-950/90 backdrop-blur-xl lg:bg-transparent lg:backdrop-blur-none lg:justify-center">
                {/* Placeholder รอประกอบ Component จริง */}
                <div className="text-amber-500/50 border border-dashed border-amber-500/30 p-12 rounded-2xl h-full lg:h-auto flex flex-col items-center justify-center gap-4 w-full max-w-xl mx-auto">
                    <FaFileLines className="w-10 h-10" />
                    <p className="text-sm tracking-widest uppercase font-semibold">
                        Content & Actions Area
                    </p>
                </div>
            </section>
        </div>
    );
}
