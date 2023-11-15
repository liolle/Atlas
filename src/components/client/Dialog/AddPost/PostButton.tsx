"use client";
import { Button } from "@/src/components/ui/button";
import { PostAddContext } from "@/src/context/PostAddProvider";
import { PostAddContextFile } from "@/src/context/PostAddProviderFile";
import AtlasClient from "@/src/services/atlas/client";
import UploadServiceClient from "@/src/services/aws/client";
import { ToastMessage } from "@/src/services/toast/toast";
import { isBaseError } from "@/src/types";

import { useRouter } from "next/navigation";
import React, { MouseEvent, useContext } from "react";

interface PostButtonInput {
    reference?: string;
    // session:Session
}

const PostButton = ({ reference }: PostButtonInput) => {
    const { content, isSending, setIsSending, onStatusChange } =
        useContext(PostAddContext);
    const { files } = useContext(PostAddContextFile);
    const router = useRouter();
    const handlePost = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsSending(true);
        if (!content || content == "") {
            setIsSending(false);
            return;
        }

        try {
            const urls = await UploadServiceClient.pushFiles({
                files: files,
                ctx: {
                    origin: "posts"
                }
            });

            if (isBaseError(urls)) {
                ToastMessage("Post Failed");
                setIsSending(false);
                return;
            }

            const result = await AtlasClient.addPost({
                input: {
                    reference: reference,
                    content: content,
                    files: urls
                }
            });

            if (result) {
                ToastMessage(result.error);
                setIsSending(false);
                return;
            }

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
