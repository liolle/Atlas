// import CardPostDisplay from "@/src/components/client/cards/CardPostDisplay";
import BaseLayout from "@/src/components/server/BaseLayout";
// import PostAddCard from "@/src/components/server/PostAddCard";
// import { PostType } from "@/src/types";
import React from "react";

export default async function Playground() {
  // const dummyPost: PostType = {
  //     id: "1a2b3c4d", // Example post ID
  //     reference: "",
  //     content: "V0 .",
  //     comments: 12, // Example number of comments
  //     likes: 45, // Example number of likes
  //     created_at: new Date(), // Example creation date
  //     owner: "john_doe", // Example post owner
  //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5NeHySQlPzk6WLxZucGyOaFVaLDC0m5FNrg&usqp=CAU", // Example image URL
  //     liked: false // Example: the current user has liked the post
  // };

  // const dummyPost2: PostType = {
  //     id: "1a2b3c4d", // Example post ID
  //     reference: "",
  //     content: "This is starting to look good.",
  //     comments: 10, // Example number of comments
  //     likes: 200, // Example number of likes
  //     created_at: new Date(), // Example creation date
  //     owner: "john_doe", // Example post owner
  //     image: "https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png", // Example image URL
  //     liked: true // Example: the current user has liked the post
  // };
  return (
    <BaseLayout>
      <div className=" flex h-full flex-col ">
        <div className=" flex flex-[0_1_100px] items-center justify-center border-b-2 border-accent-2">
          <span className=" p-2">Area to develop new components </span>
        </div>
        <div className=" flex h-full flex-1  p-1">
          {/* <div className=" flex h-full w-[600px] flex-col gap-4 rounded-lg  border-2 border-accent-2 p-2">
                        <CardPostDisplay post={dummyPost} />
                        <CardPostDisplay post={dummyPost2} />
                    </div>

                    <PostAddCard maxCharacters={200} /> */}
        </div>
      </div>
    </BaseLayout>
  );
}
