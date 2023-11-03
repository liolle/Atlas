import React from "react";
import CardPostDisplay from "../cards/CardPostDisplay";
import { LinkAction, PostType } from "@/src/types";

interface InfiniteScrollPostsProps {
    posts:
        | {
              actions: LinkAction[];
              item: PostType;
          }[]
        | null;
}

const InfiniteScrollPosts = ({ posts }: InfiniteScrollPostsProps) => {
    return (
        <div className="flex h-full w-full   @container">
            <div className=" flex h-full w-full flex-col items-start @[1000px]:items-center ">
                <div className="  h-full w-full max-w-[1000px] space-y-4  p-2  ">
                    {posts &&
                        posts.map((post) => {
                            return (
                                <CardPostDisplay
                                    key={post.item.id}
                                    post={post.item}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default InfiniteScrollPosts;
