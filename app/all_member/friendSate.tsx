"use server";

import prisma from "../lib/prisma";

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
        return state.status;
    } catch (error) {
        console.error(error);
    }
}
