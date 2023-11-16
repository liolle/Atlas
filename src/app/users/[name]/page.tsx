import InfiniteScrollPosts from "@/src/components/client/area/infinitScroll";
import Follows from "@/src/components/server/Follows";
import ProfileBoard from "@/src/components/server/ProfileBoard";
import { GetPosts } from "@/src/db/portal";
import { APIResponse, APIVersion, LinkAction, PostType } from "@/src/types";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Profile({
  params
}: {
  params: { name: string; page: string };
}) {
  const session = await getServerSession();

  const baseResponse: APIResponse = {
    self: "",
    version: APIVersion
  };

  const apiData = await GetPosts({
    input: {
      self: session?.user?.name || " ",
      field: "owner",
      value: params.name
    },
    APIResponse: baseResponse,
    options: {}
  });

  const posts = apiData.data?.content as unknown as {
    actions: LinkAction[];
    item: PostType;
  }[];

  return (
    <ProfileBoard
      follows={<Follows type="follows" name={params.name} />}
      followers={<Follows type="followers" name={params.name} />}
      posts={<InfiniteScrollPosts posts={posts} />}
      groups={<div>groups</div>}
      params={params}
      session={session}
    />
  );
}
