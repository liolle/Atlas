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
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Loading from "../loading/loading";

interface AvatarHomeProps {
    image: string;
    name: string;
}

const AvatarHome = ({ image, name }: AvatarHomeProps) => {
    return (
        <Popover>
            <PopoverTrigger className=" w-full  pr-2">
                <div className="flex h-fit w-full cursor-pointer items-end  gap-2 rounded-full p-2 hover:bg-accent-1">
                    <div className=" relative h-10 w-10 overflow-hidden rounded-full ">
                        <Avatar>
                            <AvatarImage
                                className=" h-full w-full"
                                src={image}
                            />
                            <AvatarFallback>
                                <Loading />
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    <div className=" hidden h-full  flex-1 @[250px]:flex">
                        <span className=" self-center">@{name}</span>
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent className=" w-fit select-none border-0 p-0 pr-2">
                <PopUpMenu />
            </PopoverContent>
        </Popover>
    );
};

const PopUpMenu = () => {
    return (
        <div className=" relative left-[-5px] top-[-10px] flex w-fit flex-col gap-4 rounded-lg border-[1px] border-accent-2  bg-bgc p-4 text-content shadow-toast @[1260px]:w-[220px] ">
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
            className=" flex w-fit cursor-pointer items-center gap-2 rounded-lg p-2 hover:text-accent-1"
        >
            <LogoType type="logout" />
            <span className=" hidden @[1260px]:block ">Logout</span>
        </div>
    );
};

export default AvatarHome;
