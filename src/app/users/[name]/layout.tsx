import CardProfile from "@/src/components/client/cards/cardProfile";
import BaseLayout from "@/src/components/server/BaseLayout";
import { GetUsers } from "@/src/db/portal";
import { getServerSession } from "next-auth";
import React from "react";
export default async function Layout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { name: string; page: string };
}) {
    const session = await getServerSession();
    const user = await GetUsers({
        self: session?.user?.name || " ",
        field: "name",
        value: params.name
    });

    if (!user || !user.data || user.error) {
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
            <section className=" flex h-full flex-col ">
                <div className=" flex h-60 w-full items-center justify-center border-b-2 border-accent-2 ">
                    <CardProfile
                        user={user.data.content[0].item}
                        actions={user.data.content[0].actions}
                        session={session}
                    />
                </div>

                <main className=" flex w-full flex-1 flex-col">{children}</main>
            </section>
        </BaseLayout>
    );
}
