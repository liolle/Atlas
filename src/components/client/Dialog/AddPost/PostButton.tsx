"use client";
import { Button } from "@/src/components/ui/button";
import { PostAddContext } from "@/src/context/PostAddProvider";
import { ToastMessage } from "@/src/services/toast/toast";
import { useRouter } from "next/navigation";
import React, { MouseEvent, useContext } from "react";

const PostButton = ({ reference }: { reference?: string }) => {
    const { content, isSending, setIsSending, onStatusChange } =
        useContext(PostAddContext);

    const router = useRouter();
    const handlePost = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsSending(true);
        if (!content || content == "") {
            setIsSending(false);
            return;
        }

        console.log(reference);

        try {
            // const response = await fetch("/api/posts", {
            //     method: "POST",
            //     body: JSON.stringify({
            //         content: textAreaRef.current.value,
            //         reference: reference || ""
            //     })
            // });

            // const result = await response.json();

            // if (result.error) {
            //     ToastMessage(result.error.error);
            //     return;
            // }

            ToastMessage("Post sent");
        } catch (error) {
            console.log(error);

            ToastMessage(String(error));
        } finally {
            router.refresh();
            onStatusChange(false);
        }
    };

    return (
        <Button
            onClick={handlePost}
            disabled={isSending || content.length == 0}
            type="submit"
            className=" w-16 select-none rounded-full bg-content px-3 py-1 text-bgc"
        >
            Post
        </Button>
    );
};

export default PostButton;
