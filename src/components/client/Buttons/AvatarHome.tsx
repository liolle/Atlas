"use client";
import React from "react";
import Image from "next/image";

interface AvatarHomeProps {
    image: string;
    name: string;
}

const AvatarHome = ({ image, name }: AvatarHomeProps) => {
    return (
        <div className=" w-full pr-2">
            <div className="flex w-full cursor-pointer items-end gap-2 rounded-full p-2 hover:bg-accent-1">
                <Image
                    src={image}
                    alt=""
                    width={40}
                    height={40}
                    className=" rounded-full"
                />

                <div className=" hidden h-full  flex-1 @[250px]:flex">
                    <span className=" self-center">@{name}</span>
                </div>
            </div>
        </div>
    );
};

export default AvatarHome;
