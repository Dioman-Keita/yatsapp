import { Suspense } from "react";
import AllUsersLoading from "./components/allUsersLoading";
import AllUsersContent from "./components/allUsersContent";
import { auth } from "../lib/auth";
import { headers } from "next/headers";

export default async function ListUsersPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userID = session?.user.id;
    return (
        <div className="h-full text-white flex flex-col overflow-hidden">
            <Suspense fallback={<AllUsersLoading />}>
                <AllUsersContent userIdContraint={userID} />
            </Suspense>
        </div>
    );
}
