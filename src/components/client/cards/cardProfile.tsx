"use client";
import React, { MouseEvent } from "react";
import { FollowType, LinkAction } from "@/src/types";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import Image from "next/image";
import { ToastMessage } from "@/src/services/toast/toast";

interface CardUserFollowType {
    user: FollowType;
    actions: LinkAction[];
    session: Session | null;
}

const CardProfile = ({ user, actions, session }: CardUserFollowType) => {
    const router = useRouter();
    const isOWner = (session && user.name == session.user?.name) ?? false;
    const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.push("/account");
    };

    const handleFollow = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
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
            router.refresh();
        } catch (error) {
            ToastMessage(String(error));
        }
        return;
    };

    return (
        <section className=" flex h-32 w-[416px] select-none gap-4">
            <div className="relative h-32 w-32 overflow-hidden rounded-full">
                <Image src={user.image} alt="I" layout="fill" priority={true} />
            </div>
            <div className=" flex flex-col justify-between">
                <div className="flex">@{user.name}</div>
                <div className="flex">
                    {session && (
                        <Button
                            onClick={isOWner ? handleEdit : handleFollow}
                            className=" w-32 rounded-full"
                        >
                            {isOWner
                                ? "Edit"
                                : user.following
                                ? "Unfollow"
                                : "Follow"}
                        </Button>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    <span className="">X : followers</span>
                    <Separator
                        className=" rotate-[30deg] bg-accent-2"
                        orientation="vertical"
                    />
                    <span className="">X :follows</span>
                </div>
            </div>
        </section>
    );
};

export default CardProfile;
