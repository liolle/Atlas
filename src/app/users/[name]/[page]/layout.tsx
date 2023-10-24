import ProfileBoard from "@/src/components/server/ProfileBoard";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Layout({
    params,
    children
}: {
    children: React.ReactNode;
    params: { name: string; page: string };
}) {
    const session = await getServerSession();
    return (
        <ProfileBoard params={params} session={session}>
            {children}
        </ProfileBoard>
    );
}
