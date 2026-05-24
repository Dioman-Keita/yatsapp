"use server";

import prisma from "@/app/lib/prisma";

export default async function GetNotification(id: string) {

    if (!id) return [];

    try {
        const notifications = await prisma.friendRequest.findMany({
            where: {
                receiverId: id,
                status: "PENDING",
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        
        return notifications;
    } catch (error) {
        console.error("Erreur GetNotification:", error);

        return [];
    }
}
