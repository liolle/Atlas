// import SignOutButton from "@/src/components/client/Buttons/signout";
import TestToast from "@/src/components/client/Buttons/TestToast";
import BaseLayout from "@/src/components/server/BaseLayout";
import React from "react";

export default async function Profile() {
    return (
        <BaseLayout>
            <section className=" flex items-center justify-center">
                <TestToast />
            </section>
        </BaseLayout>
    );
}
