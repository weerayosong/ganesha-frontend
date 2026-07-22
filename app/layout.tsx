import type { Metadata, Viewport } from "next";
import { Noto_Serif_Thai } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Toaster } from "react-hot-toast";

const notoSerifThai = Noto_Serif_Thai({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-noto-serif-thai",
    display: "swap",
});

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
            <body
                className={`${notoSerifThai.variable} font-sans antialiased flex flex-col h-dvh select-none touch-manipulation`}
            >
                <Header />
                <div className="flex-1 overflow-hidden relative">
                    {children}
                </div>
                {/* Toaster */}
                <Toaster
                    position="bottom-right"
                    toastOptions={{
                        style: {
                            background: "#171717",
                            color: "#fff",
                            border: "1px solid rgba(120, 53, 15, 0.4)",
                        },
                    }}
                />
            </body>
        </html>
    );
}
