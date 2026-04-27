"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Users, Settings, Lock, Edit, ImageIcon, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Option from "./components/option";
import { authClient } from "../lib/auth_client";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function Profile() {
    const [loading, SetLoding] = useState<boolean>(false);
    const router = useRouter();
    async function logOut() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                    window.location.reload();
                },
                onRequest: () => {
                    SetLoding(true);
                },
            },
        });
        router.replace("/chat");
    }
    return (
        <div className="min-h-screen bg-muted/30">
            <div className="flex items-center gap-4 px-4 py-4 bg-background shadow-sm">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft />
                </Button>
                <h1 className="text-lg font-semibold">Profile</h1>
            </div>

            <div className="max-w-md mx-auto mt-6 space-y-6 px-4">
                <div className="flex flex-col items-center text-center space-y-3">
                    <Avatar className="h-28 w-28">
                        <AvatarImage src="/avatar.png" />
                        <AvatarFallback>IS</AvatarFallback>
                    </Avatar>

                    <div>
                        <h2 className="text-xl font-semibold">Ibrahima Sidibé</h2>
                        <p className="text-sm text-muted-foreground">Toujours coder, jamais abandonner 🚀 </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users size={16} />
                        <span>245 amis</span>
                    </div>
                </div>

                <Card className="divide-y">
                    <Option
                        icon={<Edit size={18} />}
                        title="Modifier le profil"
                        description="Changer photo, nom ou bio"
                    />

                    <Option
                        icon={<ImageIcon size={18} />}
                        title="Changer la photo"
                        description="Mettre à jour votre avatar"
                    />

                    <Option
                        icon={<Lock size={18} />}
                        title="Confidentialité"
                        description="Gérer qui peut voir votre profil"
                    />

                    <Option icon={<Users size={18} />} title="Mes amis" description="Voir la liste de vos amis" />

                    <Option icon={<Settings size={18} />} title="Paramètres" description="Préférences du compte" />
                    <Button variant={"destructive"} onClick={logOut}>
                        {loading ? (
                            <Spinner />
                        ) : (
                            <div className="flex flex-row gap-3">
                                <LogOut />
                                logout
                            </div>
                        )}
                    </Button>
                </Card>
            </div>
        </div>
    );
}
