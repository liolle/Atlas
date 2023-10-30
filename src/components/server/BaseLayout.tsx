import React from "react";
import NavBar from "@/src/components/server/navbar";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex h-screen items-center justify-center  bg-bgc text-content ">
            <nav className=" flex h-full w-fit flex-[0_1_70px]  border-r-2 border-accent-2 @container @[1200px]:flex-[0_1_255px]">
                <NavBar />
            </nav>
            <section className="h-full flex-[1_0_0]">{children}</section>
        </main>
    );
};

export default BaseLayout;
