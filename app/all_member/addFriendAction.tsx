"use server";
import prisma from "../lib/prisma";

export async function addFriendAction(myID: string, id: string) {
    try {
        await prisma.friendRequest.create({
            data: {
                senderId: myID,
                receiverId: id,
                status: "PENDING",
            },
        });
    } catch (error) {
        console.error(error);
    }
}
