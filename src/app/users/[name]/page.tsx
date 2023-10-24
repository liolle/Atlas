import ProfileBoard from "@/src/components/server/ProfileBoard";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Profile({
    params
}: {
    params: { name: string; page: string };
}) {
    const session = await getServerSession();
    return (
        <ProfileBoard params={params} session={session}>
            <span>Main</span>
        </ProfileBoard>
    );
}
