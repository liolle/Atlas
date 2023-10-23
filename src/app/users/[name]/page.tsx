import BaseLayout from "@/src/components/server/BaseLayout";
import { GetUsers } from "@/src/db/portal";
import { isBaseError } from "@/src/types";
import React from "react";

export default async function Profile({
    params
}: {
    params: { name: string };
}) {
    const user = await GetUsers({
        field: "name",
        value: params.name
    });

    if (!user || isBaseError(user) || !user[0]) {
        return (
            <BaseLayout>
                <section className=" flex h-full items-center justify-center">
                    <span>Should redirect User not found page </span>
                </section>
            </BaseLayout>
        );
    }

    return (
        <BaseLayout>
            <section className=" flex h-full items-center justify-center">
                <span>{params.name}</span>
            </section>
        </BaseLayout>
    );
}
