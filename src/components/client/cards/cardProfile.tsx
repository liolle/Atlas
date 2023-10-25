"use client";
import React, { MouseEvent } from "react";
import { FollowType, LinkAction } from "@/src/types";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import Image from "next/image";
import { ToastMessage } from "@/src/services/toast/toast";

interface CardUserFollowType {
    data: FollowType;
    actions: LinkAction[];
}

const CardProfile = ({
    user,
    session
}: {
    user: CardUserFollowType;
    session: Session | null;
}) => {
    const router = useRouter();
    const isOWner = (session && user.data.name == session.user?.name) ?? false;
    const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.push("/account");
    };

    const handleFollow = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (user.data.following == undefined) return;
        const action = user.actions.find(
            (value) =>
                value.type ==
                (user.data.following ? "unfollowUser" : "followUser")
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
        <section className=" flex h-32 w-80 select-none gap-4">
            <div className="relative h-32 w-32 overflow-hidden rounded-full">
                <Image
                    src={user.data.image}
                    alt="I"
                    layout="fill"
                    priority={true}
                />
            </div>
            <div className=" flex flex-col justify-between">
                <div className="flex">@{user.data.name}</div>
                <div className="flex">
                    {session && (
                        <Button
                            onClick={isOWner ? handleEdit : handleFollow}
                            className=" w-32 rounded-full"
                        >
                            {isOWner
                                ? "Edit"
                                : user.data.following
                                ? "Unfollow"
                                : "Follow"}
                        </Button>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <Link
                        className="hover:text-accent-1"
                        href={`/users/${user.data.name}/followers`}
                    >
                        followers
                    </Link>
                    <Separator
                        className=" bg-accent-2"
                        orientation="vertical"
                    />
                    <Link
                        className="hover:text-accent-1"
                        href={`/users/${user.data.name}/follows`}
                    >
                        follows
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CardProfile;
