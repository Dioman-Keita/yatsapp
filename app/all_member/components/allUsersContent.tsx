"use server";
import prisma from "@/app/lib/prisma";
import ListAllUsers from "../listAllUsers";

export default async function AllUsersContent({ userIdContraint }: { userIdContraint: string | undefined }) {
    const users = await prisma.user.findMany({
        where: {
            NOT: {
                id: userIdContraint,
            },
        },
        orderBy: { name: "asc" },
    });
    return <ListAllUsers users={users} />;
}
