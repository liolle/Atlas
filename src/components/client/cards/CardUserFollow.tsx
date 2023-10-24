"use client";
import { FollowType, LinkAction } from "@/src/types";
import React, { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui/button";
interface CardUserFollowType {
    user: {
        data: FollowType;
        actions: LinkAction[];
    };
}

const CardUserFollow = ({ user }: CardUserFollowType) => {
    const handleFollow = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(user.actions.find((value) => value.type == "followUser"));
    };

    return (
        <div className=" flex w-96 items-center justify-between  rounded-xl border-[1px] border-accent-2  p-4">
            <div className=" flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full  ">
                    <Image
                        src={user.data.image}
                        alt="I"
                        layout="fill"
                        priority={true}
                    />
                </div>
                <div className=" flex h-full flex-col justify-between">
                    <Link
                        className="text-lg font-bold hover:text-accent-1"
                        href={`/users/${user.data.name}`}
                    >
                        @{user.data.name}
                    </Link>
                </div>
            </div>
            <Button onClick={handleFollow} className=" w-20 rounded-full">
                {"Follow"}
            </Button>
        </div>
    );
};

export default CardUserFollow;
