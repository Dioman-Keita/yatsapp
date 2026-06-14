"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();
    return (
        <div className="md:hidden">
            <button onClick={() => router.back()}>
                <ChevronLeft />
            </button>
        </div>
    );
}
