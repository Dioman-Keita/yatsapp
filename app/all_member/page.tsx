"use client";
import { Suspense } from "react";
import { useUser } from "../store/user.store";
import AllUsersLoading from "./components/allUsersLoading";
import AllUsersContent from "./components/allUsersContent";

export default function ListUsersPage() {
    const { userID } = useUser();
    return (
        <div className="h-full text-white flex flex-col overflow-hidden">
            <Suspense fallback={<AllUsersLoading />}>
                <AllUsersContent userIdContraint={userID} />
            </Suspense>
        </div>
    );
}
