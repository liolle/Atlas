"use client";
import { PostType } from "@/src/types";
import React, { MouseEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ToastMessage } from "@/src/services/toast/toast";
import { timeAgo } from "@/src/lib/time";
import { MessageCircle } from "lucide-react";
import { LikeSVG } from "../../server/logo";

interface CardPostDisplayProps {
    post: PostType;
}

const CardPostDisplay = ({ post }: CardPostDisplayProps) => {
    const router = useRouter();
    const [isSending, setIsSending] = useState(false);

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
            const response = await fetch(`/api/posts/${post.id}?action=like`, {
                method: "POST"
            });

            const result = await response.json();

            if (result.error) {
                ToastMessage(result.error.error);
                return;
            }

            router.refresh();
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
            className=" h-fit w-full  cursor-pointer overflow-hidden rounded-xl border-2 border-accent-2 bg-bgc hover:bg-accent-2/5"
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
            <div className="px-6 py-4">
                <div className="text-sm text-content ">{post.content}</div>
            </div>
            <div className="flex items-center justify-between border-t border-accent-2 px-4">
                <div className="flex items-center gap-6 ">
                    <div
                        onClick={handleLikeClick}
                        className={` ${
                            post.liked && " text-accent-like"
                        } flex cursor-pointer items-center gap-1  p-[0.5rem] text-accent-2  hover:text-accent-like`}
                    >
                        <LikeSVG isLiked={post.liked} />
                        <span>{post.likes}</span>
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
