import CardProfile from "@/src/components/client/cards/cardProfile";
import BaseLayout from "@/src/components/server/BaseLayout";
import { GetUsers } from "@/src/db/portal";
import { FollowType, isBaseError } from "@/src/types";
import { getServerSession } from "next-auth";
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

    if (!user || isBaseError(user) || !user[0].data) {
        return (
            <BaseLayout>
                <section className=" flex h-full items-center justify-center">
                    <span>Should redirect User not found page </span>
                </section>
            </BaseLayout>
        );
    }

    const session = await getServerSession();

    const profile: FollowType = {
        name: user[0].data.name || "",
        image: user[0].data.image || ""
    };

    console.log(session);

    return (
        <BaseLayout>
            <section className=" flex h-full flex-col ">
                <div className=" flex h-60 w-full items-center justify-center ">
                    <CardProfile profile={profile} session={session} />
                </div>

                <main className=" w-full flex-1">
                    <div className=" h-14 w-full bg-green-500">
                        <span>Profile card</span>
                    </div>
                </main>
            </section>
        </BaseLayout>
    );
}
