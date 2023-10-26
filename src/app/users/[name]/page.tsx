import Follows from "@/src/components/server/Follows";
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
        <ProfileBoard
            follows={<Follows type="follows" name={params.name} />}
            followers={<Follows type="followers" name={params.name} />}
            posts={<div>posts</div>}
            groups={<div>groups</div>}
            params={params}
            session={session}
        />
    );
}
