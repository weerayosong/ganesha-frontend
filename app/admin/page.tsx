import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import LoginForm from "@/components/auth/LoginForm";

export default function AdminPage() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative p-6">
            {/* พื้นหลัง */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,var(--color-dark-900)_0%,var(--color-dark-950)_70%)] z-0"></div>

            <div className="relative z-10 w-full max-w-md flex flex-col">
                {/* back */}
                <div className="mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-amber-500 transition-colors"
                    >
                        <FaChevronLeft className="w-3 h-3" />
                        <span>กลับหน้าแรก</span>
                    </Link>
                </div>

                {/* LoginForm */}
                <LoginForm />
            </div>
        </div>
    );
}
