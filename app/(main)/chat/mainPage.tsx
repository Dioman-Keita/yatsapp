"use client";

import { usePathname } from "next/navigation";

export default function MainPage({ children }: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname();
    const isChatting = pathname.startsWith("/chat/chatbox");

    return (
        <main
            className={`flex-1 h-screen overflow-hidden relative ${isChatting ? "flex" : "hidden md:flex"}`}>
            {children}
        </main>
    );
}
