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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import GetNotification from "../actions/getNotification";
import { useEffect, useState } from "react";
import { reject, valider } from "../actions/actionFriend";
import { useRouter } from "next/navigation";

type FriendRequestStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export interface notif {
    id: string;
    senderId: string;
    receiverId: string;
    status: FriendRequestStatus;
    createdAt: Date;
    updatedAt: Date;
    sender: {
        id: string;
        name: string;
        image: string | null;
    };
    receiver?: {
        id: string;
        name: string;
        image: string | null;
    };
}

export function NotificationDialog({ userID }: { userID: string }) {
    const [notifications, setNotifications] = useState<notif[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const fetchNotifications = async () => {
        try {
            const result = await GetNotification(userID);
            if (!result) throw new Error("nous avons pas pu recuperer les notifs");
            setNotifications(result);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, [userID]);

    const handleAction = async (action: Function, ...args: any[]) => {
        setIsLoading(true);
        try {
            await action(...args);
            // On rafraîchit les données serveur
            router.refresh();
            // On ré-interroge l'état local
            await fetchNotifications();
        } catch (error) {
            console.error("Action failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications.length > 0 && (
                        <span className="absolute top-1 right-1 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Notifications</DialogTitle>
                    <DialogDescription>
                        {notifications.length > 0
                            ? "Consultez vos dernières demandes d'amis ici."
                            : "Vous n'avez pas de nouvelles notifications."}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4 max-h-[400px] overflow-y-auto">
                    {notifications.map(ntf => (
                        <div
                            key={ntf.id}
                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer border-b last:border-0">
                            <Avatar>
                                <AvatarImage src={ntf.sender.image || ""} alt={ntf.sender.name} />
                                <AvatarFallback>{ntf.sender.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-medium leading-none">{ntf.sender.name}</p>
                                <p className="text-sm text-muted-foreground mt-1">vous a envoyé une demande d'ami</p>
                                <p className="text-[10px] text-muted-foreground mt-2">
                                    {new Date(ntf.createdAt).toLocaleDateString()}
                                </p>
                                <div className="flex gap-3">
                                    <Button 
                                        onClick={() => handleAction(reject, ntf.id)} 
                                        variant={"destructive"}
                                        disabled={isLoading}>
                                        reject
                                    </Button>
                                    <Button 
                                        onClick={() => handleAction(valider, ntf.id, ntf.receiverId, ntf.senderId)}
                                        disabled={isLoading}>
                                        add
                                    </Button>
                                </div>
                            </div>
                            <div className="h-2 w-2 rounded-full bg-primary shrink-0"></div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
