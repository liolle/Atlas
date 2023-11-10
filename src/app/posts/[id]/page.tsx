import InfiniteScrollPosts from "@/src/components/client/area/infinitScroll";
import CardPostDisplay from "@/src/components/client/cards/CardPostDisplay";
import { GetPosts } from "@/src/db/portal";
import { APIResponse, APIVersion, PostTypeElement } from "@/src/types";
import { getServerSession } from "next-auth";
import React, { Suspense } from "react";

export default async function Page({ params }: { params: { id: string } }) {
    const session = await getServerSession();

    const baseResponse: APIResponse = {
        self: "",
        version: APIVersion
    };

    const apiData = await GetPosts({
        input: {
            self: session?.user?.name || " ",
            field: "all",
            reference: params.id,
            value: ""
        },
        APIResponse: baseResponse,
        options: {
            pagination: {
                index: 1,
                limit: 5
            }
        }
    });

    const result = apiData.data?.content as unknown as PostTypeElement[];

    if (!result) {
        return (
            <div className="flex h-full w-full items-center justify-center border-r-2 border-accent-2 ">
                <span> Oops this post does not exist</span>
            </div>
        );
    }

    let subject: PostTypeElement | null = null;

    const posts: PostTypeElement[] = [];

    for (const post of result) {
        if (post.item.id == params.id) {
            subject = post;
        } else {
            posts.push(post);
        }
    }

    return (
        <div className=" min-h-screen border-r-2 border-accent-2">
            <div className="h-full w-full border-b-2 border-accent-2 px-2 py-6">
                {!!subject && (
                    <CardPostDisplay
                        key={(subject as PostTypeElement).item.id}
                        post={(subject as PostTypeElement).item}
                    />
                )}
            </div>
            <div className="h-full w-full  py-4 ">
                <Suspense fallback={<div>Loading</div>}>
                    <InfiniteScrollPosts posts={posts || []} />
                </Suspense>
            </div>
        </div>
    );
}
