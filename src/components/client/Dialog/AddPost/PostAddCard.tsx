"use client";
import React, { useContext } from "react";
import { X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { PostAddContext } from "@/src/context/PostAddProvider";
import TextA from "./TextA";
import PostButton from "./PostButton";
import FileArea from "./FileArea";
import PostButtonFile from "./PostButtonFile";
interface PostAddCardProps {
    reference?: string;
}

const PostAddCard = ({ reference }: PostAddCardProps) => {
    return (
        <form className="  flex h-fit w-full  flex-col gap-4  overflow-hidden rounded-xl  border-2 border-accent-2 bg-bgc text-content ">
            <div className="flex select-none items-center justify-between px-4 pt-2">
                <Dialog.Close>
                    <X className=" cursor-pointer rounded-full hover:text-accent-1" />
                </Dialog.Close>
                <CharacterCount />
            </div>
            <div className="    overflow-y-auto  ">
                <div className=" flex min-h-[15rem]  flex-col  p-2 ">
                    <TextA />
                    <FileArea />
                </div>
            </div>
            <div className="flex items-center justify-between border-t border-accent-2 ">
                <div className="flex w-full items-center justify-between px-4 py-2">
                    <PostButtonFile />
                    <PostButton reference={reference} />
                </div>
            </div>
        </form>
    );
};

const CharacterCount = () => {
    const { content, maxCharacter } = useContext(PostAddContext);
    return <div>{`${content.length}/${maxCharacter}`}</div>;
};

export default PostAddCard;
