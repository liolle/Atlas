"use client";
import React from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/src/components/ui/popover";
import { LogOut } from "lucide-react";
import { LogoType } from "@/src/types";
import { signOut } from "next-auth/react";
import Image from "next/image";

interface AvatarHomeProps {
    image: string;
    name: string;
}

const AvatarHome = ({ image, name }: AvatarHomeProps) => {
    return (
        <Popover>
            <PopoverTrigger className=" w-full  px-2">
                <div className="flex h-fit w-full cursor-pointer items-end  gap-2 rounded-full p-2 hover:bg-accent-1">
                    <div className=" relative h-10 w-10 overflow-hidden rounded-full ">
                        <Image
                            src={image}
                            alt="I"
                            fill
                            sizes="(max-width: 600px) 100vw, 600px"
                            loading="eager"
                        />
                    </div>

                    <div className=" hidden h-full  flex-1 @[250px]:flex">
                        <span className=" self-center">@{name}</span>
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent className=" w-full select-none border-0 p-0 pr-2">
                <PopUpMenu />
            </PopoverContent>
        </Popover>
    );
};

const PopUpMenu = () => {
    return (
        <div className=" relative  top-[-10px] flex w-fit flex-col gap-4 rounded-lg border-[1px] border-accent-2  bg-bgc p-4 text-content shadow-toast @[1200px]:w-[220px] ">
            <PopUpItem type="logout" />
        </div>
    );
};

interface getLogoProps {
    type: LogoType;
}

const LogoType = ({ type }: getLogoProps) => {
    switch (type) {
        case "logout":
            return <LogOut />;

        default:
            return <>Should not get here</>;
    }
};

const PopUpItem = ({ type }: getLogoProps) => {
    const logout = () => {
        signOut();
    };

    const handleClick = () => {
        switch (type) {
            case "logout":
                logout();
                break;

            default:
                break;
        }
    };

    return (
        <div
            onClick={handleClick}
            className=" flex w-full cursor-pointer items-center gap-2 rounded-lg px-1 py-2 hover:text-accent-1 @[1200px]:px-2"
        >
            <LogoType type="logout" />
            <span className=" hidden @[1200px]:block ">Logout</span>
        </div>
    );
};

export default AvatarHome;
