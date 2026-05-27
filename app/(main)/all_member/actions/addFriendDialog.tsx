"use client";
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
import { addFriendAction } from "../actions/addFriendAction";
import { useEffect, useState } from "react";
import { cencelFriend } from "../actions/cancekFirend";
import { useRouter } from "next/navigation";
import { friendState } from "../components/friendSate";

export function AddFriendDialog({
    id,
    name,
    email,
    image,
    myID,
}: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    myID: string;
}) {
    const [state, setState] = useState<"PENDING" | "ACCEPTED" | "REJECTED" | string>("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const fetchState = async () => {
        const data = await friendState(myID, id);
        if (data) {
            setState(data);
        } else {
            setState("");
        }
    };

    useEffect(() => {
        fetchState();
    }, [myID, id]);

    const handleAction = async (action: Function) => {
        setIsLoading(true);
        try {
            const result = await action(myID, id);
            if (result.success) {
                // On rafraîchit les données serveur
                router.refresh();
                // On ré-interroge l'état local
                await fetchState();
            }
        } catch (error) {
            console.error("Action failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {state === "PENDING" ? (
                    <Button variant="outline" disabled={isLoading}>Attente</Button>
                ) : state === "ACCEPTED" ? (
                    <Button variant="outline" disabled={isLoading}>Amis</Button>
                ) : (
                    <Button variant="outline" disabled={isLoading}>Ajouter</Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{name}</DialogTitle>
                    <DialogDescription>{email}</DialogDescription>
                </DialogHeader>
                <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4 flex items-center gap-4">
                    <Avatar className="h-28 w-28">
                        <AvatarImage src={`${image}`} />
                        <AvatarFallback>IS</AvatarFallback>
                    </Avatar>
                    
                    <div className="ml-auto">
                        {state === "PENDING" ? (
                            <Button
                                disabled={isLoading}
                                className="transition-all duration-150 ease-in-out hover:scale-105 active:scale-95"
                                onClick={() => handleAction(cencelFriend)}>
                                {isLoading ? "..." : "ANNULER"}
                            </Button>
                        ) : state === "ACCEPTED" ? (
                            <Button
                                disabled={isLoading}
                                className="transition-all duration-150 ease-in-out hover:scale-105 active:scale-95"
                                onClick={() => handleAction(cencelFriend)}>
                                {isLoading ? "..." : "SUPPRIMER"}
                            </Button>
                        ) : (
                            <Button
                                disabled={isLoading}
                                className="transition-all duration-150 ease-in-out hover:scale-105 active:scale-95"
                                onClick={() => handleAction(addFriendAction)}>
                                {isLoading ? "..." : "AJOUTER"}
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
