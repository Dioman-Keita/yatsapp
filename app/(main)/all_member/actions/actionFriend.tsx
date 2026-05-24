"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Valide une demande d'ami et crée la relation d'amitié de manière atomique
 */
export async function valider(requestId: string, myId: string, senderId: string) {
    if (!requestId || !myId || !senderId) return { error: "Données manquantes" };

    try {
        await prisma.$transaction(async (tx) => {
            // 1. Mettre à jour le statut de la demande
            await tx.friendRequest.update({
                where: { id: requestId },
                data: { status: "ACCEPTED" },
            });

            // 2. Vérifier si la relation d'amitié existe déjà pour éviter les doublons
            const existingFriend = await tx.friend.findFirst({
                where: {
                    OR: [
                        { user1Id: myId, user2Id: senderId },
                        { user1Id: senderId, user2Id: myId },
                    ],
                },
            });

            if (!existingFriend) {
                // 3. Créer la relation d'amitié officielle
                await tx.friend.create({
                    data: {
                        user1Id: myId,
                        user2Id: senderId,
                    },
                });
            }
        });

        revalidatePath("/all_member");
        return { success: true };
    } catch (error) {
        console.error("Erreur lors de la validation de l'ami:", error);
        return { error: "Erreur lors de l'acceptation de la demande" };
    }
}

/**
 * Rejette une demande d'ami
 */
export async function reject(requestId: string) {
    if (!requestId) return { error: "ID de demande manquant" };

    try {
        await prisma.friendRequest.update({
            where: { id: requestId },
            data: { status: "REJECTED" },
        });

        revalidatePath("/all_member");
        return { success: true };
    } catch (error) {
        console.error("Erreur lors du rejet de l'ami:", error);
        return { error: "Erreur lors du rejet de la demande" };
    }
}
