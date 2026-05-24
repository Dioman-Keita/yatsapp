"use server";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function cencelFriend(myID: string, targetID: string) {
    if (!myID || !targetID) return { error: "Identifiants manquants" };

    try {
        await prisma.$transaction(async (tx) => {
            // 1. Supprimer les demandes d'amis (dans les deux sens)
            await tx.friendRequest.deleteMany({
                where: {
                    OR: [
                        { receiverId: targetID, senderId: myID },
                        { receiverId: myID, senderId: targetID },
                    ],
                },
            });

            // 2. Supprimer la relation d'amitié si elle existe
            await tx.friend.deleteMany({
                where: {
                    OR: [
                        { user1Id: myID, user2Id: targetID },
                        { user1Id: targetID, user2Id: myID },
                    ],
                },
            });
        });

        revalidatePath("/all_member");
        return { success: true };
    } catch (error) {
        console.error("Erreur cencelFriend:", error);
        return { error: "Impossible de supprimer la relation" };
    }
}
