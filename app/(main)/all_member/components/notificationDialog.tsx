"use client";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import GetNotification from "../actions/getNotification";
import { useEffect, useState } from "react";

export interface notif {
    id: string;
    senderId: string;
    receiverId: string;
    status: FriendRequestStatus;
    createdAt: Date;
    updatedAt: Date;
}

export function NotificationDialog({ userID }: { userID: string }) {
    const [notif, setNotif] = useState<notif[]>([]);
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const result = await GetNotification(userID);
                if (!result) throw new Error("nous avons pas pu recuperer les notifs");
                setNotif(result);
            } catch (error) {
                console.error(error);
            }
        };
        fetchNotifications();
    }, [userID]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Notifications</DialogTitle>
                    <DialogDescription>Consultez vos dernières notifications ici.</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    {/* Placeholder for notifications */}
                    <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                        <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                        <div>
                            <p className="text-sm font-medium">Nouvelle demande d'ami</p>
                            <p className="text-xs text-muted-foreground">Il y a 2 minutes</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                        <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                        <div>
                            <p className="text-sm font-medium">Message de Jean</p>
                            <p className="text-xs text-muted-foreground">Il y a 1 heure</p>
                        </div>
                    </div>
                    <p className="text-center text-xs text-muted-foreground pt-2">Aucune autre notification</p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
