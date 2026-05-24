"use server";

import prisma from "@/app/lib/prisma";

export default async function GetNotification(id: string) {
    try {
        const notif = await prisma.friendRequest.findMany({
            where: {
                NOT: {
                    id: id,
                },
            },
        });
        if (!notif) throw new Error("ne n'avons pas pu recuperer les notif");
        return notif;
    } catch (error) {
        console.log(error);
        return [];
    }
}
