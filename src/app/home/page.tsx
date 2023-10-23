import TestToast from "@/src/components/client/Buttons/TestToast";
import BaseLayout from "@/src/components/server/BaseLayout";
import React from "react";

export default async function Home() {
    return (
        <BaseLayout>
            <section className=" flex h-full items-center justify-center">
                <TestToast />
            </section>
        </BaseLayout>
    );
}
