"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/app/lib/prisma";

export async function addFriendAction(myID: string, id: string) {
    try {
        await prisma.friendRequest.create({
            data: {
                senderId: myID,
                receiverId: id,
                status: "PENDING",
            },
        });
        revalidatePath("/all_member");
    } catch (error) {
        console.error(error);
    }
}
