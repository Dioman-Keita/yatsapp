import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { headers } from "next/headers";
import { auth } from "./lib/auth";
import { BottomNav } from "@/components/bottom-nav";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

async function NavContent({ children }: { children: React.ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return (
        <>
            <AppSidebar user={session?.user} />
            <BottomNav user={session?.user as any} />
            <SidebarInset className="pb-16 md:pb-0 overflow-hidden flex flex-col min-w-0 w-full">
                {children}
            </SidebarInset>
        </>
    );
}

function NavFallback({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="hidden md:flex w-[260px] flex-col border-r bg-sidebar p-4 space-y-4">
                <Skeleton className="h-12 w-full rounded-xl" />
                <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map(i => (
                        <Skeleton key={i} className="h-10 w-full" />
                    ))}
                </div>
            </div>
            <div className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t md:hidden flex items-center justify-around px-4">
                {[1, 2, 3, 4, 5].map(i => (
                    <Skeleton key={i} className="h-8 w-8 rounded-lg" />
                ))}
            </div>
            <SidebarInset className="pb-16 md:pb-0 overflow-hidden flex flex-col min-w-0 w-full">
                {children}
            </SidebarInset>
        </>
    );
}

export default function SideBar({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <Suspense fallback={<NavFallback>{children}</NavFallback>}>
                <NavContent>{children}</NavContent>
            </Suspense>
        </SidebarProvider>
    );
}
