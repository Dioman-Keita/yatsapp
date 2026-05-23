import { Suspense } from "react";
import prisma from "@/app/lib/prisma";
import ListUsers from "./listUsers";
import { Skeleton } from "@/components/ui/skeleton";
import MainPage from "./mainPage";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function UsersListContent() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    const users = await prisma.user.findMany({
        take: 50,
    });
    return <ListUsers user={users} />;
}

function UsersListFallback() {
    return (
        <div className="flex flex-col p-4 space-y-4 w-full md:w-[320px] lg:w-[380px] xl:w-[420px] 2xl:w-[480px] border-r h-screen">
            <Skeleton className="h-10 w-full rounded-md" />
            {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-4 flex-1" />
                </div>
            ))}
        </div>
    );
}
export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-row w-full h-full overflow-hidden bg-background">
            <Suspense fallback={<UsersListFallback />}>
                <UsersListContent />
            </Suspense>
            <MainPage>{children}</MainPage>
        </div>
    );
}
