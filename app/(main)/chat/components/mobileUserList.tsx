"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { UsersIcon } from "lucide-react";
import ListUsers from "@/app/(main)/chat/listUsers";
import { userInterface } from "@/interface_and_type/user";

export function MobileUserList({ users }: { users: userInterface[] }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="md:hidden p-2 rounded-md hover:bg-secondary/50">
                    <UsersIcon size={20} />
                </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80">
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>Amis</SheetTitle>
                </SheetHeader>
                <div className="h-full overflow-hidden">
                    <ListUsers user={users} />
                </div>
            </SheetContent>
        </Sheet>
    );
}
