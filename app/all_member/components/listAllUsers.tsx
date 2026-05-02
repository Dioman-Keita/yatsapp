"use client";
import { profileNameAb } from "@/functions/string_function";
import { AvatarWithBadge } from "../../chat/components/avatarWithBadge";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { userInterface } from "@/interface_and_type/user";
import { useState, useMemo } from "react";
import { AddFriendDialog } from "./addFriendDialog";

export default function ListAllUsers({ users, myID }: { users: userInterface[]; myID: string }) {
    const [search, setSearch] = useState<string>("");

    const filteredUsers = useMemo(() => {
        return users.filter(user => user.name?.toLowerCase().includes(search.toLowerCase()));
    }, [search, users]);

    return (
        <div className="h-full flex flex-col bg-background">
            <div className="p-4 border-b">
                <h1 className="text-xl font-bold mb-4">Liste de tes amis</h1>
                <div className="relative flex items-center gap-2">
                    <div className="relative flex-1">
                        <Input
                            placeholder="Rechercher un ami..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="pl-9 h-10"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                        <div
                            key={user.id}
                            className="flex items-center justify-between p-4 hover:bg-secondary/30 cursor-pointer transition-colors border-b border-border/50">
                            <div className="flex items-center gap-3">
                                <AvatarWithBadge image={user.image as string} CN={profileNameAb(user.name)} />
                                <div>
                                    <h3 className="font-bold text-primary leading-tight">{user.name}</h3>
                                </div>
                            </div>
                            <AddFriendDialog
                                id={user.id as string}
                                email={user.email as string}
                                name={user.name as string}
                                image={user.image as string}
                                myID={myID}
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted-foreground p-10 text-sm">Aucun utilisateur trouvé.</p>
                )}
            </div>
        </div>
    );
}
