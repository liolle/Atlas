import CardProfile from "@/src/components/client/cards/cardProfile";
import BaseLayout from "@/src/components/server/BaseLayout";
import { GetUsers } from "@/src/db/portal";
import { FollowType } from "@/src/types";
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
        input: {
            self: session?.user?.name || " ",
            field: "name",
            value: params.name
        }
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
            <section className="  flex h-full  w-full gap-4  @container">
                <div className="flex h-full w-full">
                    <div className="  flex h-fit min-h-screen flex-[3_1_0] flex-col  border-r-2 border-accent-2 ">
                        <div className=" sticky left-0 top-0 z-10 flex w-[100%] flex-[0_0_15rem] items-center justify-center border-b-2  border-accent-2 bg-bgc  ">
                            <div></div>
                            <CardProfile
                                user={user.data.content[0].item as FollowType}
                                actions={user.data.content[0].actions}
                                session={session}
                            />
                        </div>
                        <main className=" flex h-full max-h-[calc(100vh-240px)] w-full overflow-y-auto  ">
                            <div className="block h-full w-full ">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </section>
        </BaseLayout>
    );
}
