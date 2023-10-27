import BaseLayout from "@/src/components/server/BaseLayout";
import Link from "next/link";
import React from "react";

export default async function Account() {
    return (
        <BaseLayout>
            <section className=" flex h-full flex-col p-6 ">
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
