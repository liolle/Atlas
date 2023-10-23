// import { FormUpdateUser } from "@/src/components/client/Forms/formUpdateUser";
import BaseLayout from "@/src/components/server/BaseLayout";
import Link from "next/link";
// import { getServerSession } from "next-auth";
import React from "react";

export default async function Account() {
    // const session = await getServerSession();
    return (
        <BaseLayout>
            <section className=" flex h-full flex-col p-6 ">
                {/* <FormUpdateUser field="name" session={session} />
                <FormUpdateUser field="image" session={session} /> */}
                <div className=" flex h-20 w-full items-center gap-4 ">
                    <Link
                        href={"/account"}
                        className={`rounded-full px-3 py-2 text-content`}
                    >
                        General
                    </Link>
                    <Link
                        href={"/account/other"}
                        className=" rounded-full bg-content px-3 py-2 text-bgc"
                    >
                        Other
                    </Link>
                </div>
                <div className=" flex-1"></div>
            </section>
        </BaseLayout>
    );
}
