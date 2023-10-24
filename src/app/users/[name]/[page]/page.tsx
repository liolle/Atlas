import React from "react";

export default async function Profile({
    params
}: {
    params: { name: string; page: string };
}) {
    return <div>{params.name}</div>;
}
