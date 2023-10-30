import React from "react";
import CardPostDisplay from "../cards/CardPostDisplay";
import { LinkAction, PostType } from "@/src/types";

interface InfiniteScrollPostsProps {
    posts: {
        actions: LinkAction[];
        item: PostType;
    }[];
}

const InfiniteScrollPosts = ({ posts }: InfiniteScrollPostsProps) => {
    return (
        <div className=" flex w-full flex-col items-center">
            <div className="  h-full w-full max-w-[500px]   space-y-4 p-2 @[1200px]:max-w-[800px]">
                {posts.map((post) => {
                    return (
                        <CardPostDisplay key={post.item.id} post={post.item} />
                    );
                })}
            </div>
        </div>
    );
};

export default InfiniteScrollPosts;
