"use server";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function cencelFriend(myID: string, id: string) {
    try {
        await prisma.friendRequest.deleteMany({
            where: {
                OR: [
                    { receiverId: id, senderId: myID },
                    { receiverId: myID, senderId: id },
                ],
            },
        });
        revalidatePath("/all_member");
    } catch (error) {
        console.error(error);
    }
}
