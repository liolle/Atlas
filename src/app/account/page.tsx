import { FormUpdateUser } from "@/src/components/client/Forms/formUpdateUser";
import BaseLayout from "@/src/components/server/BaseLayout";
import Link from "next/link";
import { getServerSession } from "next-auth";
import React from "react";
import { FormPictureUpload } from "@/src/components/client/Forms/formPictureUpload";

export default async function Account() {
    const session = await getServerSession();
    return (
        <BaseLayout>
            <section className=" flex h-full  flex-col p-6 ">
                <div className=" flex h-20 w-full items-center gap-4 ">
                    <Link
                        href={"/account"}
                        className=" rounded-full bg-content px-3 py-2 text-bgc"
                    >
                        General
                    </Link>
                </div>
                <div className=" flex flex-1 flex-col gap-8 p-6">
                    <FormUpdateUser field="name" session={session} />
                    <FormPictureUpload session={session} />
                </div>
            </section>
        </BaseLayout>
    );
}
