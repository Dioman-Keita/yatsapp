import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { BottomNav } from "@/components/bottom-nav";

export default function SideBar({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <BottomNav />
            <SidebarInset className="pb-16 md:pb-0 overflow-hidden flex flex-col min-w-0 w-full">
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
