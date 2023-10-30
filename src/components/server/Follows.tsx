import { GetFollows } from "@/src/db/portal";
import { APIResponse, FollowType } from "@/src/types";
import React from "react";
import { getServerSession } from "next-auth";
import CardUserFollow from "../client/cards/CardUserFollow";
interface FollowsProps {
    type: "followers" | "follows";
    name: string;
}

const Follows = async ({ type, name }: FollowsProps) => {
    let follows: APIResponse | null = null;
    const session = await getServerSession();
    try {
        switch (type) {
            case "follows":
                follows = await GetFollows({
                    input: {
                        self: session?.user?.name || " ",
                        field: "self",
                        value: name
                    }
                });
                break;

            case "followers":
                follows = await GetFollows({
                    input: {
                        self: session?.user?.name || " ",
                        field: "follow",
                        value: name
                    }
                });
                break;
        }

        if (follows.error) {
            <div className=" flex flex-1 items-center justify-center">
                <span>{follows.error.error}</span>
            </div>;
        }
    } catch (error) {
        <div className=" flex flex-1 items-center justify-center">
            <span>{String(error)}</span>
        </div>;
    }

    return (
        <div className=" flex h-full flex-1 flex-col gap-4 px-4 pb-4 pt-8">
            {(follows?.data?.content || []).map((user) => {
                const follow = user.item as FollowType;
                return (
                    <CardUserFollow
                        key={follow.name}
                        user={follow}
                        actions={user.actions}
                        isOWner={session?.user?.name == follow.name}
                    />
                );
            })}
        </div>
    );
};

export default Follows;
