import prisma from "@/app/lib/prisma";
import ListAllUsers from "./listAllUsers";

export default async function AllUsersContent({ userIdContraint }: { userIdContraint: string | undefined }) {
    try {
        const users = await prisma.user.findMany({
            where: userIdContraint ? {
                NOT: {
                    id: userIdContraint,
                },
            } : {},
            orderBy: { name: "asc" },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                createdAt: true,
            }
        });

        return <ListAllUsers users={users as any} myID={userIdContraint || ""} />;
    } catch (error) {
        console.error("Erreur AllUsersContent:", error);
        return <div>Erreur lors du chargement des membres</div>;
    }
}
