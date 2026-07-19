import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";

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
            <body className="antialiased flex flex-col h-dvh">
                <Header />
                <div className="flex-1 overflow-hidden relative">
                    {children}
                </div>
            </body>
        </html>
    );
}
