import { GetFollows } from "@/src/db/portal";
import { GetUserFollowType, isBaseError } from "@/src/types";
import React from "react";
import { getServerSession } from "next-auth";
import CardUserFollow from "../client/cards/CardUserFollow";
interface FollowsProps {
    type: "followers" | "follows";
    name: string;
}

const Follows = async ({ type, name }: FollowsProps) => {
    let follows = null;
    const session = await getServerSession();
    try {
        switch (type) {
            case "follows":
                follows = await GetFollows({
                    self: session?.user?.name || " ",
                    field: "self",
                    value: name
                });
                break;

            case "followers":
                follows = await GetFollows({
                    self: session?.user?.name || " ",
                    field: "follow",
                    value: name
                });
                break;
        }

        if (isBaseError(follows)) {
            <div className=" flex flex-1 items-center justify-center">
                <span>{follows.error}</span>
            </div>;
        }
    } catch (error) {
        <div className=" flex flex-1 items-center justify-center">
            <span>{String(error)}</span>
        </div>;
    }

    return (
        <div className=" flex h-full flex-1 flex-col gap-4 px-4 pb-4 pt-8">
            {(follows as GetUserFollowType["output"]).map((user) => {
                return (
                    <CardUserFollow
                        key={user.data.name}
                        user={user}
                        isOWner={session?.user?.name == user.data.name}
                    />
                );
            })}
        </div>
    );
};

export default Follows;
