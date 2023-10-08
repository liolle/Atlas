import SignOutButton from "@/src/components/client/Buttons/signout";
import React from "react";

export default async function Home() {
    return (
        <main className="flex min-h-screen items-center justify-center ">
            <span>Home page</span>
            <SignOutButton />
        </main>
    );
}
