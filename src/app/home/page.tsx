import PostDialog from "@/src/components/client/Buttons/PostDialog";
import InfiniteScrollPosts from "@/src/components/client/area/infinitScroll";
import BaseLayout from "@/src/components/server/BaseLayout";
import { GetPosts } from "@/src/db/portal";
import { APIResponse, APIVersion, LinkAction, PostType } from "@/src/types";
import { getServerSession } from "next-auth";
import React, { Suspense } from "react";

export default async function Home() {
    const session = await getServerSession();

    const baseResponse: APIResponse = {
        self: "",
        version: APIVersion
    };

    const apiData = await GetPosts({
        input: {
            self: session?.user?.name || " ",
            field: "all",
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

    const posts = apiData.data?.content as unknown as {
        actions: LinkAction[];
        item: PostType;
    }[];

    return (
        <BaseLayout>
            <section className="  flex h-full w-full gap-4  @container">
                <div className="flex h-full w-full overflow-y-auto">
                    <div className="  flex h-fit min-h-screen  flex-[3_1_0] flex-col border-r-2 border-accent-2  ">
                        <div className=" sticky left-0 top-0 z-10 flex h-[70px] w-[100%] items-center justify-between border-b-2 border-accent-2 px-4 backdrop-blur-sm ">
                            <div></div>
                            <PostDialog>New post</PostDialog>
                        </div>

                        <Suspense fallback={<div>Loading</div>}>
                            <InfiniteScrollPosts posts={posts || []} />
                        </Suspense>
                    </div>
                    <div className=" hidden h-full max-w-[500px] flex-[1_1_0] flex-col  @[950px]:flex">
                        <div className=" sticky left-0 top-0 z-10 flex h-[70px] w-[100%] items-center justify-center border-b-2 border-accent-2 bg-bgc  ">
                            <span>WIP</span>
                        </div>
                        <div className=" flex h-full w-full flex-1 items-center justify-center ">
                            <span>WIP</span>
                        </div>
                    </div>
                </div>
            </section>
        </BaseLayout>
    );
}
