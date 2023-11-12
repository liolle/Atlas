"use client";
import { PostAddContext } from "@/src/context/PostAddProvider";
import React, { ChangeEvent, useContext, useRef } from "react";

const TextA = () => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { setContent } = useContext(PostAddContext);
    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault;
        setContent(e.target.value);
    };

    return (
        <textarea
            className=" h-full w-full flex-[1_0_150px] resize-none overflow-y-hidden bg-bgc p-2 text-start text-content focus:outline-none"
            placeholder="What's happening?"
            maxLength={200}
            onChange={handleTextChange}
            ref={textAreaRef}
        />
    );
};

export default TextA;
