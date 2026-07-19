import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";

// ล็อกการซูมหน้าจอ (แก้ปัญหา Double-Tap Zoom บน iOS)
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export const metadata: Metadata = {
    title: "Ganesha",
    description: "Ganesha Digital Altar",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="th">
            {/* เพิ่ม select-none เพื่อกันการเผลอคลุมดำ (Text Selection) */}
            <body className="antialiased flex flex-col h-dvh select-none touch-manipulation">
                <Header />
                <div className="flex-1 overflow-hidden relative">
                    {children}
                </div>
            </body>
        </html>
    );
}
