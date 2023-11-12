"use client";
import { PostType } from "@/src/types";
import React, { MouseEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ToastMessage } from "@/src/services/toast/toast";
import { timeAgo } from "@/src/lib/time";
import { MessageCircle } from "lucide-react";
import { LikeSVG } from "../../server/logo";
import AtlasClient from "@/src/services/atlas/client";
import CardPostFileDisplay from "./CardPostFileDisplay";

interface CardPostDisplayProps {
    post: PostType;
}

const CardPostDisplay = ({ post }: CardPostDisplayProps) => {
    const router = useRouter();
    const [isSending, setIsSending] = useState(false);
    const [liked, setLiked] = useState(post.liked);
    const [likes, setLikes] = useState(post.likes);

    const handlePostClick = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        router.push(`/posts/${post.id}`);
    };

    const handleAvatarClick = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!post.owner) return;
        router.push(`/users/${post.owner}`);
    };

    const handleLikeClick = async (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!post.owner) return;
        if (isSending) return;
        setIsSending(true);

        try {
            const response = await AtlasClient.likePost({ id: post.id });

            if (!response) {
                setLiked(!liked);
                setLikes(liked ? likes - 1 : likes + 1);
                return;
            }
        } catch (error) {
            ToastMessage(String(error));
        } finally {
            setIsSending(false);
        }
    };

    const handleCommentClick = async (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        router.push(`/posts/${post.id}`);
    };

    return (
        <div
            onClick={handlePostClick}
            className=" h-fit w-full max-w-3xl  cursor-pointer overflow-hidden rounded-xl border-2 border-accent-2 bg-bgc hover:bg-accent-2/5"
        >
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex space-x-4">
                    <div
                        onClick={handleAvatarClick}
                        className="flex w-full cursor-pointer items-end  gap-2 rounded-full  hover:text-accent-1"
                    >
                        <div className=" relative h-12 w-12 overflow-hidden rounded-full ">
                            <Image
                                src={post.image}
                                alt="I"
                                fill
                                sizes="48px"
                                loading="lazy"
                            />
                        </div>

                        <div className=" flex h-full items-center ">
                            <span className=" ">@{post.owner}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full space-y-4 px-6 py-4">
                <div className="text-lg text-content ">{post.content}</div>
                <CardPostFileDisplay files={post.files || []} />
            </div>
            <div className="flex items-center justify-between border-t border-accent-2 px-4">
                <div className="flex items-center gap-6 ">
                    <div
                        onClick={handleLikeClick}
                        className={` ${
                            liked && " text-accent-like"
                        } flex cursor-pointer items-center gap-1  p-[0.5rem] text-accent-2  hover:text-accent-like`}
                    >
                        <LikeSVG isLiked={liked} />
                        <span>{likes}</span>
                    </div>

                    <div
                        onClick={handleCommentClick}
                        className={`  flex cursor-pointer items-center gap-1 p-[0.5rem]  text-accent-2 hover:text-accent-Com`}
                    >
                        <MessageCircle />
                        <span>{post.comments}</span>
                    </div>
                </div>
                <div>{timeAgo(post.created_at)}</div>
            </div>
        </div>
    );
};

export default CardPostDisplay;
