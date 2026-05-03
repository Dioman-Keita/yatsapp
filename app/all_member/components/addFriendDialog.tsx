"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { addFriendAction } from "../actions/addFriendAction";
import { friendState } from "../actions/friendSate";
import { useEffect, useState } from "react";
import { cencelFriend } from "../actions/cancekFirend";

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
    useEffect(() => {
        async function fetchState() {
            const data = await friendState(myID, id);
            if (data) {
                setState(data);
            }
        }

        fetchState();
    }, [myID, id]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                {state === "PENDING" ? (
                    <Button variant="outline">wait</Button>
                ) : state === "ACCEPTED" ? (
                    <Button variant="outline">DEL</Button>
                ) : (
                    <Button variant="outline">ADD</Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{name}</DialogTitle>
                    <DialogDescription>{email}</DialogDescription>
                </DialogHeader>
                <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4 flex">
                    <Avatar className="h-28 w-28">
                        <AvatarImage src={`${image}`} />
                        <AvatarFallback>IS</AvatarFallback>
                    </Avatar>
                    {state === "PENDING" ? (
                        <Button className="ml-auto my-auto" onClick={() => cencelFriend(myID, id)}>
                            CANCEL{" "}
                        </Button>
                    ) : state === "ACCEPTED" ? (
                        <Button className="ml-auto my-auto" onClick={() => addFriendAction(myID, id)}>
                            DEL{" "}
                        </Button>
                    ) : (
                        <Button className="ml-auto my-auto" onClick={() => addFriendAction(myID, id)}>
                            add{" "}
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
