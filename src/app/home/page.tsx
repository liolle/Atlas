import SignOutButton from "@/src/components/client/Buttons/signout";
import React from "react";

export default async function Home() {
    return (
        <main className="flex min-h-screen items-center justify-center gap-2 bg-bgc text-content">
            <span>Home page</span>
            <SignOutButton />
        </main>
    );
}
