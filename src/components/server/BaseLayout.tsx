import React from "react";
import NavBar from "@/src/components/server/navbar";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex h-screen items-center justify-center  bg-bgc text-content ">
            <nav className=" flex h-full flex-[0_1_20%] justify-end border-r-2 border-accent-2 @container">
                <NavBar />
            </nav>
            <section className="h-full flex-1">{children}</section>
        </main>
    );
};

export default BaseLayout;
