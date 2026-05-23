"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/app/lib/prisma";

export async function friendState(myID: string, id: string) {
    try {
        const state = await prisma.friendRequest.findFirst({
            where: {
                OR: [
                    { receiverId: id, senderId: myID },
                    { receiverId: myID, senderId: id },
                ],
            },
            select: {
                status: true,
            },
        });
        if (!state) throw new Error("impossibele de recupperer");
        revalidatePath("/all_member");
        return state.status;
    } catch (error) {
        console.error(error);
    }
}
