"use client";

import { MdChat, MdOutlineVideoCameraBack } from "react-icons/md";
import { RiGroupLine } from "react-icons/ri";
import { PhoneCall, User2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AvatarWithBadge } from "@/app/(main)/chat/components/avatarWithBadge";
import { profileNameAb } from "@/functions/string_function";
import { cn } from "@/lib/utils";
import { useSession } from "@/app/lib/auth_client";

interface userType {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
}

export function BottomNav({ user: initialUser }: { user?: userType | null }) {
    const { data: session } = useSession();
    const user = initialUser || session?.user;
    const pathname = usePathname();

    const navItems = [
        { href: "/chat", icon: MdChat, label: "Chat" },
        { href: "/stories", icon: MdOutlineVideoCameraBack, label: "Stories" },
        { href: "/all_member", icon: RiGroupLine, label: "Membres" },
        { href: "/groupe", icon: RiGroupLine, label: "Groupes" },
        { href: "/call", icon: PhoneCall, label: "Appels" },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/80 backdrop-blur-xl border-t-2 border-primary/20 h-16 px-4 pb-safe">
            <nav className="flex items-center justify-around h-full max-w-lg mx-auto">
                {navItems.map(item => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center p-2 rounded-xl transition-all",
                                isActive
                                    ? "bg-primary text-primary-foreground scale-110 shadow-lg"
                                    : "text-muted-foreground hover:text-primary"
                            )}>
                            <Icon size={20} />
                            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
                        </Link>
                    );
                })}
                {!user ? (
                    <Link
                        href="/login"
                        className={cn(
                            "flex flex-col items-center justify-center p-2 rounded-xl",
                            pathname === "/login"
                                ? "bg-primary text-primary-foreground shadow-lg"
                                : "text-muted-foreground"
                        )}>
                        <User2Icon size={20} />
                        <span className="text-[10px] mt-1 font-medium">Login</span>
                    </Link>
                ) : (
                    <Link
                        href="/profile"
                        className={cn(
                            "flex flex-col items-center justify-center rounded-xl",
                            pathname === "/profile" ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                        )}>
                        <AvatarWithBadge CN={profileNameAb(user.name)} image={user.image as string} />
                    </Link>
                )}
            </nav>
        </div>
    );
}
