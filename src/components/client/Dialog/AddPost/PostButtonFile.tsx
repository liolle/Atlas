"use client";
import { PostAddContextFile } from "@/src/context/PostAddProviderFile";
import React, { useContext, useRef } from "react";

interface FileBuffer {
    [key: string]: File;
}

const PostButtonFile = () => {
    const { files, setFiles } = useContext(PostAddContextFile);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = () => {
        if (!fileInputRef.current || !fileInputRef.current.files) return;

        const buffer: FileBuffer = {};

        for (const file of files) {
            if (!(file.name in buffer)) {
                buffer[file.name] = file;
            }
        }

        for (const file of fileInputRef.current.files) {
            if (!(file.name in buffer)) {
                buffer[file.name] = file;
            }
        }

        const CFiles = Object.keys(buffer).map((value) => buffer[value]);
        setFiles(() => CFiles);
    };

    const handleClick = () => {
        if (!fileInputRef.current) return;
        fileInputRef.current.click();
    };

    return (
        <div
            onClick={handleClick}
            className="flex cursor-pointer  items-center justify-center   p-[0.5rem] text-accent-2 hover:text-accent-1"
        >
            <input
                onChange={handleInputChange}
                className=" hidden"
                ref={fileInputRef}
                type="file"
            />
            <span>Add</span>
        </div>
    );
};

export default PostButtonFile;
