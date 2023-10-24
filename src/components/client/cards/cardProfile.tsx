"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import React, { MouseEvent } from "react";
import { FollowType } from "@/src/types";
import Loading from "../loading/loading";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

const CardProfile = ({
    profile,
    session
}: {
    profile: FollowType;
    session: Session | null;
}) => {
    const router = useRouter();
    const isOWner = (session && profile.name == session.user?.name) ?? false;
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.push("/account");
    };

    const handleFollow = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("follow");
    };

    return (
        <section className=" flex h-32 w-80 select-none gap-4">
            <div className="relative h-32 w-32 overflow-hidden rounded-full">
                <Avatar className="">
                    <AvatarImage className=" h-full" src={profile.image} />
                    <AvatarFallback>
                        <Loading />
                    </AvatarFallback>
                </Avatar>
            </div>
            <div className=" flex flex-col justify-between">
                <div className="flex">@{profile.name}</div>
                <div className="flex">
                    {session && (
                        <Button
                            onClick={isOWner ? handleClick : handleFollow}
                            className=" w-32 rounded-full"
                        >
                            {isOWner ? "Edit" : "Follow"}
                        </Button>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <Link className="hover:text-accent-1" href="">
                        followers
                    </Link>
                    <Separator
                        className=" bg-accent-2"
                        orientation="vertical"
                    />
                    <Link className="hover:text-accent-1" href="">
                        follows
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CardProfile;
