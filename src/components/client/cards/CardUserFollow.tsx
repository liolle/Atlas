"use client";
import { FollowType, LinkAction } from "@/src/types";
import React, { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui/button";
import { ToastMessage } from "@/src/services/toast/toast";
import { useRouter } from "next/navigation";
interface CardUserFollowType {
    user: FollowType;
    actions: LinkAction[];
    isOWner: boolean;
}

const CardUserFollow = ({ user, isOWner, actions }: CardUserFollowType) => {
    const router = useRouter();
    const handleFollow = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!user.name) return;

        if (user.following == undefined) return;
        const action = actions.find(
            (value) =>
                value.type == (user.following ? "unfollowUser" : "followUser")
        );
        if (!action || !action.link) return;

        try {
            await fetch(action.link, {
                method: "POST"
            });
            // router.push( `/users/${}`)
            router.refresh();
        } catch (error) {
            ToastMessage(String(error));
        }
        return;
    };

    return (
        <div className=" flex w-96 items-center justify-between  rounded-xl border-[1px] border-accent-2  p-4">
            <div className=" flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full  ">
                    <Image
                        src={user.image}
                        alt="I"
                        layout="fill"
                        priority={true}
                    />
                </div>
                <div className=" flex h-full flex-col justify-between">
                    <Link
                        className="text-lg font-bold hover:text-accent-1"
                        href={`/users/${user.name}`}
                    >
                        @{user.name}
                    </Link>
                </div>
            </div>
            {!isOWner && (
                <Button
                    onClick={handleFollow}
                    className=" w-20 rounded-full px-2"
                >
                    {user.following ? "Unfollow" : "Follow"}
                </Button>
            )}
        </div>
    );
};

export default CardUserFollow;
