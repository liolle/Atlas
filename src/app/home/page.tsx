// import SignOutButton from "@/src/components/client/Buttons/signout";
import NavBar from "@/src/components/server/navbar";
import React from "react";

export default async function Home() {
    return (
        <main className="flex h-screen items-center justify-center gap-2 bg-bgc text-content">
            <nav className=" @container flex h-full flex-[0_1_20%] justify-end border-r-2 border-accent-2">
                <NavBar />
            </nav>
            <section className=" flex-1"></section>
        </main>
    );
}
