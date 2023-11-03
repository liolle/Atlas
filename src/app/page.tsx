import React from "react";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import {
    AnimatedLogoSVG,
    AnimatedNavButton
} from "../components/client/AnimatedSVG";

export default function Main() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-bgc text-content ">
            <div className=" top-0 flex h-20 w-full select-none justify-between p-4">
                <div></div>
                <div className=" flex gap-4">
                    <Link
                        className=" flex h-10 w-10 items-center justify-center rounded-full bg-content text-bgc hover:bg-accent-1"
                        href="https://github.com/liolle/Atlas"
                        target="blank"
                    >
                        <Github />
                    </Link>
                    <Link
                        className=" flex h-10 w-10 items-center justify-center rounded-full bg-content text-bgc hover:bg-accent-1"
                        href="https://www.linkedin.com/in/etiennelaurentdev"
                        target="blank"
                    >
                        <Linkedin />
                    </Link>
                </div>
            </div>
            <div className=" flex flex-1 flex-col items-center justify-center gap-4">
                <AnimatedLogoSVG size={150} />
                <AnimatedNavButton />
            </div>
        </main>
    );
}
