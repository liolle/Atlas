import { NavigationVariant } from "@/src/types";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
// import Image from "next/image";
import AvatarHome from "../client/Buttons/AvatarHome";

import { headers } from "next/headers";

const NavBar = async () => {
    const session = await getServerSession();

    return (
        <div className=" flex h-full w-fit flex-col items-center  justify-between gap-4 py-6 ">
            <div className="flex  h-full flex-col gap-4 @[250px]:w-[250px]  ">
                <Link
                    className=" flex w-full justify-start @[250px]:justify-start @[250px]:pl-3 "
                    href="/"
                >
                    <span>LOGO</span>
                </Link>
                <NavigationItem variant="home" />
                <NavigationItem variant="profile" />
            </div>
            <AvatarHome
                image={
                    session?.user?.image ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM4TfipskFLoycix3JSNW7DbUIkzdJoNsk6m4XpVtEunqZGil1nwWeZlhsBzbUqF_AdA0&usqp=CAU"
                }
                name={session?.user?.name || ""}
            />
        </div>
    );
};

interface NavItemItemProps {
    variant?: NavigationVariant;
}

const NavigationItem = ({ variant = "home" }: NavItemItemProps) => {
    const headersList = headers();
    const activePage = headersList.get("x-page");
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
        case "profile":
            return (
                <Link
                    className={`flex w-fit justify-center gap-2 rounded-full p-2 text-xl text-content ${"hover:text-accent-1"}`}
                    href="/profile"
                >
                    <ProfileSVG isActive={activePage == variant} />
                    <span
                        className={`hidden  @[250px]:block ${
                            activePage == variant && "font-bold text-accent-1"
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

interface SVGIcon {
    isActive?: boolean;
    size?: number;
}

const HomeSVG = ({ isActive = false, size = 30 }: SVGIcon) => {
    return (
        <div className=" relative left-[-1px] top-[-3px] flex-1">
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className={`fill-current ${
                    isActive ? "text-accent-1" : "text-content"
                }`}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 2L3 9V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H9V12H15V22H19C19 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V9L12 2Z"
                    className={`stroke-current ${
                        isActive ? "text-accent-1" : "text-content"
                    }`}
                    transform={`scale(${size / 23})`}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};

const ProfileSVG = ({ isActive = false, size = 30 }: SVGIcon) => {
    return (
        <div className=" relative left-[-1px] top-[-3px] flex-1">
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g
                    clipPath="url(#a)"
                    className={`stroke-current ${
                        isActive ? "text-accent-1" : "text-content"
                    }`}
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path
                        d="M15 16c3.866 0 7-3.358 7-7.5C22 4.358 18.866 1 15 1S8 4.358 8 8.5c0 4.142 3.134 7.5 7 7.5Z"
                        className={`fill-current ${
                            isActive ? "text-accent-1" : "text-content"
                        }`}
                        transform={`scale(${size / 30})`}
                    />
                    <path
                        d="M22.847 16c4.09 2.338 6.868 6.466 7.152 11.216.016.429-.347.784-.805.784H.806c-.458 0-.821-.355-.806-.784.285-4.72 3.048-8.834 7.09-11.172L12.368 16l2.632.76 2.63-.76h5.216Z"
                        className={` left-[50%] top-[50%]  ${
                            isActive
                                ? "fill-current text-accent-1"
                                : "fill-current text-content"
                        }`}
                        transform={`scale(${size / 30})`}
                    />
                </g>
            </svg>
        </div>
    );
};

export default NavBar;
