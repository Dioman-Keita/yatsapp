"use server";

import prisma from "@/app/lib/prisma";

/**
 * Récupère l'état de la relation (demande d'ami) entre deux utilisateurs
 */
export async function friendState(myID: string, targetID: string) {
    if (!myID || !targetID) return null;

    try {
        const state = await prisma.friendRequest.findFirst({
            where: {
                OR: [
                    { receiverId: targetID, senderId: myID },
                    { receiverId: myID, senderId: targetID },
                ],
            },
            select: {
                status: true,
            },
        });

        // Si aucune demande n'est trouvée, on vérifie si ils sont déjà amis
        if (!state) {
            const friendship = await prisma.friend.findFirst({
                where: {
                    OR: [
                        { user1Id: myID, user2Id: targetID },
                        { user1Id: targetID, user2Id: myID },
                    ],
                },
            });

            if (friendship) return "ACCEPTED";
            return null;
        }

        return state.status;
    } catch (error) {
        console.error("Erreur friendState:", error);
        return null;
    }
}
