"use client";
import { userInterface } from "@/interface_and_type/user";
import { InputButtonGroup } from "./components/searchInput";
import UserIcon from "./components/userIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function ListUsers({ user }: { user: userInterface[] }) {
    const pathname = usePathname();
    const isChatting = pathname.startsWith("/chat/chatbox");

    return (
        <div className={`w-full md:w-[320px] lg:w-[380px] xl:w-[420px] 2xl:w-[480px] h-screen border-r shrink-0 overflow-hidden flex flex-col bg-background/50 ${isChatting ? "hidden md:flex" : "flex"}`}>
            <div className="p-4 border-b">
                <InputButtonGroup />
            </div>

            <div className="flex-1 overflow-y-auto noScrollBar py-2">
                {user.length > 0 ? (
                    user.map(data => (
                        <Link href={"/chat/chatbox"} key={data.id} className="px-2">
                            <UserIcon
                                image={data.image as string}
                                name={data.name}
                                offlineTime="connecte il y a 12 H"
                                className="hover:bg-secondary/50 rounded-xl px-2 cursor-pointer"
                            />
                        </Link>
                    ))
                ) : (
                    <p className="text-center text-muted-foreground p-10 text-sm">Aucun ami trouvé.</p>
                )}
            </div>
        </div>
    );
}
