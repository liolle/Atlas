"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";

import * as Dialog from "@radix-ui/react-dialog";
import PostAddCard from "../../server/PostAddCard";
const PostDialog = () => {
    const [isMounted, setIsMounted] = useState(false);

    // hydration trick
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <Button
                disabled
                className="rounded-full bg-content px-3 py-2 text-bgc"
            >
                New post
            </Button>
        );
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger className="">
                <Button className="rounded-full bg-content px-3 py-2 text-bgc">
                    New post
                </Button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-fgc/50" />
                <Dialog.Content className="fixed left-1/2 top-1/2 flex w-[400] -translate-x-1/2  -translate-y-1/2 shadow md:w-[600px]   xl:w-[800px]">
                    <PostAddCard maxCharacters={200} />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default PostDialog;
