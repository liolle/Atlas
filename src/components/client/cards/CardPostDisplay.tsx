"use client";
import { PostType } from "@/src/types";
import React, { MouseEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ToastMessage } from "@/src/services/toast/toast";
import { timeAgo } from "@/src/lib/time";
import { MessageCircle } from "lucide-react";

interface CardPostDisplayProps {
    post: PostType;
}

const CardPostDisplay = ({ post }: CardPostDisplayProps) => {
    const router = useRouter();
    const [isSending, setIsSending] = useState(false);

    const handlePostClick = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        console.log("div click");
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
                        className={`  hover:text-accent-Com flex cursor-pointer items-center gap-1  p-[0.5rem] text-accent-2`}
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RePostSVG = () => {
    return (
        <svg
            className=" h-4 w-4 text-accent-2"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
        </svg>
    );
};

interface LikeSVGProps {
    isLiked?: boolean;
    size?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LikeSVG = ({ isLiked = false, size = 24 }: LikeSVGProps) => {
    return (
        <svg
            className={` ${isLiked && " fill-current"}  stroke-current `}
            fill="none"
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DownloadSVG = () => {
    return (
        <svg
            className=" h-4 w-4 text-accent-2"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
    );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MoreSVG = () => {
    return (
        <svg
            className=" h-4 w-4 text-accent-2"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
        </svg>
    );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BokmarkSVG = () => {
    return (
        <svg
            className=" h-4 w-4 text-accent-2"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
        </svg>
    );
};

export default CardPostDisplay;
