import Follows from "@/src/components/server/Follows";
import React from "react";

export default async function Profile({
    params
}: {
    params: { name: string; page: string };
}) {
    if (params.page == "follows")
        return <Follows type={params.page} name={params.name} />;
    if (params.page == "followers")
        return <Follows type={params.page} name={params.name} />;

    return <div>{params.name}</div>;
}
