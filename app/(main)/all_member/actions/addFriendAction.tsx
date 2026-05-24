"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/app/lib/prisma";

export async function addFriendAction(myID: string, targetID: string) {
    if (!myID || !targetID) return { error: "Identifiants manquants" };
    if (myID === targetID) return { error: "Vous ne pouvez pas vous ajouter vous-même" };

    try {
        // Vérifier si une relation existe déjà (Ami ou Demande)
        const existingRelation = await prisma.$transaction(async (tx) => {
            // 1. Vérifier les demandes existantes
            const request = await tx.friendRequest.findFirst({
                where: {
                    OR: [
                        { senderId: myID, receiverId: targetID },
                        { senderId: targetID, receiverId: myID },
                    ],
                },
            });

            if (request) return { type: "REQUEST", status: request.status };

            // 2. Vérifier si déjà amis
            const friendship = await tx.friend.findFirst({
                where: {
                    OR: [
                        { user1Id: myID, user2Id: targetID },
                        { user1Id: targetID, user2Id: myID },
                    ],
                },
            });

            if (friendship) return { type: "FRIEND" };

            return null;
        });

        if (existingRelation) {
            if (existingRelation.type === "FRIEND") return { error: "Vous êtes déjà amis" };
            if (existingRelation.type === "REQUEST") {
                return { error: existingRelation.status === "PENDING" ? "Demande déjà en attente" : "Une demande a déjà été traitée" };
            }
        }

        await prisma.friendRequest.create({
            data: {
                senderId: myID,
                receiverId: targetID,
                status: "PENDING",
            },
        });

        revalidatePath("/all_member");
        return { success: true };
    } catch (error) {
        console.error("Erreur addFriendAction:", error);
        return { error: "Une erreur est survenue lors de l'envoi de la demande" };
    }
}
