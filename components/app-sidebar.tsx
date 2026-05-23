"use client";

import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { FaY } from "react-icons/fa6";
import { MdChat, MdOutlineVideoCameraBack } from "react-icons/md";
import { RiGroupLine } from "react-icons/ri";
import { PhoneCall, User2Icon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profileNameAb } from "@/functions/string_function";
import { useUser } from "@/app/store/user.store";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useSession } from "@/app/lib/auth_client";
import { AvatarWithBadge } from "@/app/(main)/chat/components/avatarWithBadge";

interface userType {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
}
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    user?: userType | undefined | null;
}

export function AppSidebar({ user: initialUser, ...props }: AppSidebarProps) {
    const { data: session } = useSession();
    const user = initialUser || session?.user;

    const setUserName = useUser(state => state.setUserName);
    const setUserEmail = useUser(state => state.setUserEmail);
    const setUserId = useUser(state => state.setUserId);

    useEffect(() => {
        if (user) {
            setUserId(user.id);
            setUserEmail(user.email);
            setUserName(user.name);
        }
    }, [user, setUserId, setUserEmail, setUserName]);
    return (
        <Sidebar collapsible="icon" className="border-r bg-sidebar/50" {...props}>
            <SidebarHeader className="flex items-center justify-center h-16 border-b shrink-0">
                <div className="flex items-center justify-center size-10 rounded-xl bg-primary text-primary-foreground shadow-lg shrink-0">
                    <FaY className="size-5" />
                </div>
            </SidebarHeader>
            <SidebarContent className="py-6 px-2 overflow-x-hidden scrollbar-hide">
                <div className="flex flex-col gap-2">
                    <SideBarIcon routeName="chat">
                        <MdChat size={24} className="shrink-0" />
                        <span className="group-data-[collapsible=icon]:hidden font-medium">Messages</span>
                    </SideBarIcon>
                    <SideBarIcon routeName="stories">
                        <MdOutlineVideoCameraBack size={24} className="shrink-0" />
                        <span className="group-data-[collapsible=icon]:hidden font-medium">Stories</span>
                    </SideBarIcon>
                    <SideBarIcon routeName="all_member">
                        <UsersIcon size={24} className="shrink-0" />
                        <span className="group-data-[collapsible=icon]:hidden font-medium">Membres</span>
                    </SideBarIcon>
                    <SideBarIcon routeName="groupe">
                        <RiGroupLine size={24} className="shrink-0" />
                        <span className="group-data-[collapsible=icon]:hidden font-medium">Groupes</span>
                    </SideBarIcon>
                    <SideBarIcon routeName="call">
                        <PhoneCall size={24} className="shrink-0" />
                        <span className="group-data-[collapsible=icon]:hidden font-medium">Appels</span>
                    </SideBarIcon>
                </div>

                <div className="flex mt-auto flex-col gap-2 pt-6 border-t border-border/50">
                    {!user ? (
                        <SideBarIcon routeName="login">
                            <User2Icon size={24} className="shrink-0" />
                            <span className="group-data-[collapsible=icon]:hidden font-medium">Se connecter</span>
                        </SideBarIcon>
                    ) : (
                        <SideBarIcon routeName="profile">
                            <AvatarWithBadge
                                CN={profileNameAb(user.name)}
                                image={user.image as string}
                                className="size-6 shrink-0"
                            />
                            <span className="group-data-[collapsible=icon]:hidden font-medium truncate ml-1">
                                {user.name}
                            </span>
                        </SideBarIcon>
                    )}
                </div>
            </SidebarContent>
        </Sidebar>
    );
}

export function SideBarIcon({
    children,
    routeName,
    className,
}: {
    children: React.ReactNode;
    routeName: string;
    className?: string;
}) {
    const pathname = usePathname();
    const isActive = pathname === `/${routeName}`;

    return (
        <Link
            href={`/${routeName}`}
            className={cn(
                "flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group-data-[collapsible=icon]:justify-center",
                isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-secondary/80 text-muted-foreground hover:text-foreground",
                className
            )}>
            {children}
        </Link>
    );
}
