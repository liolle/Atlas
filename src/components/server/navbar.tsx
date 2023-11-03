import { NavigationVariant } from "@/src/types";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import AvatarHome from "../client/Buttons/AvatarHome";

import { headers } from "next/headers";
import { HomeSVG, LogoSVG, ProfileSVG } from "./logo";

const NavBar = async () => {
    const session = await getServerSession();
    return (
        <div className=" flex h-full w-full flex-col  justify-between gap-4 py-6 ">
            <div className="flex  h-full flex-col items-center gap-4 px-2 @[250px]:items-start  ">
                <Link
                    className=" flex w-fit  text-content @[250px]:pl-3 "
                    href="/"
                >
                    <LogoSVG size={50} />
                </Link>
                <NavigationItem variant="home" />
                <NavigationItem variant="account" />
                <NavigationItem
                    variant="profile"
                    username={session?.user?.name as string}
                />
            </div>

            <AvatarHome
                image={
                    (session && session.user?.image) ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM4TfipskFLoycix3JSNW7DbUIkzdJoNsk6m4XpVtEunqZGil1nwWeZlhsBzbUqF_AdA0&usqp=CAU"
                }
                name={(session && session.user?.name) || ""}
            />
        </div>
    );
};

interface NavItemItemProps {
    variant?: NavigationVariant;
    username?: string;
}

const NavigationItem = ({ variant = "home", username }: NavItemItemProps) => {
    const headersList = headers();
    const activePage = headersList.get("x-page");
    const activePath = headersList.get("x-path") as string;
    const pathUser = activePath?.split(/[/?]/)[2];
    const regex = /^\/users\/*/;

    const isProfileSelected = regex.test(activePath) && pathUser == username;

    switch (variant) {
        case "home":
            return (
                <Link
                    className={`flex w-fit justify-center gap-2 rounded-full p-2 text-xl text-content ${"hover:text-accent-1"}`}
                    href="/home"
                >
                    <HomeSVG isActive={activePage == variant} />
                    <span
                        className={`hidden  @[250px]:block ${
                            activePage == variant && "font-bold text-accent-1"
                        }`}
                    >
                        Home
                    </span>
                </Link>
            );
        case "account":
            return (
                <Link
                    className={`flex w-fit justify-center gap-2 rounded-full p-2 text-xl text-content ${"hover:text-accent-1"}`}
                    href="/account"
                >
                    <ProfileSVG isActive={activePage == variant} />
                    <span
                        className={`hidden  @[250px]:block ${
                            activePage == variant && "font-bold text-accent-1"
                        }`}
                    >
                        Account
                    </span>
                </Link>
            );
        case "profile":
            return (
                <Link
                    className={`flex w-fit justify-center gap-2 rounded-full p-2 text-xl text-content ${"hover:text-accent-1"}`}
                    href={`/users/${username}`}
                >
                    <ProfileSVG isActive={isProfileSelected} />
                    <span
                        className={`hidden  @[250px]:block ${
                            isProfileSelected && "font-bold text-accent-1"
                        }`}
                    >
                        Profile
                    </span>
                </Link>
            );

        default:
            return <></>;
    }
};

export default NavBar;
