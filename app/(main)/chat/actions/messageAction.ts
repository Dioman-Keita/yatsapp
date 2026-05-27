"use server";

import { PusherServer } from "@/app/lib/pusher";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function sendMessageAction(senderId: string, receiverId: string, content: string) {
    if (!content.trim()) return { error: "Message vide" };

    try {
        const message = await prisma.message.create({
            data: {
                content,
                senderId,
                receiverId,
            },
            include: {
                sender: true,
            }
        });

        // Trigger Pusher for both sender and receiver
        await Promise.all([
            PusherServer.trigger(`chat-${receiverId}`, "new-message", message),
            PusherServer.trigger(`chat-${senderId}`, "new-message", message)
        ]);
        
        revalidatePath("/chat");
        return { success: true, message };
    } catch (error) {
        console.error("Error in sendMessageAction:", error);
        return { error: "Failed to send message" };
    }
}

export async function getMessagesAction(user1Id: string, user2Id: string) {
    try {
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: user1Id, receiverId: user2Id },
                    { senderId: user2Id, receiverId: user1Id },
                ],
            },
            orderBy: {
                createdAt: "asc",
            },
            include: {
                sender: true,
            }
        });
        return messages;
    } catch (error) {
        console.error("Error in getMessagesAction:", error);
        return [];
    }
}
