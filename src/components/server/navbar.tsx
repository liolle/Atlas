import { NavigationVariant } from "@/src/types";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
// import Image from "next/image";
import AvatarHome from "../client/Buttons/AvatarHome";

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
                <NavigationItem />
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
    isActive?: boolean;
}

const NavigationItem = ({
    variant = "home",
    isActive = true
}: NavItemItemProps) => {
    switch (variant) {
        case "home":
            return (
                <Link
                    className=" flex w-fit justify-center gap-2 rounded-full p-2 text-xl text-content hover:bg-accent-1"
                    href="/home"
                >
                    <HomeSVG isActive={isActive} />
                    <span className=" hidden  @[250px]:block">Home</span>
                </Link>
            );

        default:
            return <>Should not get here</>;
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
                className={` left-[50%] top-[50%]  ${
                    isActive
                        ? " fill-current text-transparent"
                        : "  text-transparent"
                }`}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 2L3 9V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H9V12H15V22H19C19 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V9L12 2Z"
                    className="stroke-current text-content"
                    transform={`scale(${size / 23})`}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};

export default NavBar;
