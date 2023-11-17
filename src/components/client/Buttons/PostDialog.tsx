"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";

import * as Dialog from "@radix-ui/react-dialog";
import PostAddCard from "../Dialog/AddPost/PostAddCard";
import { PostAddProvider } from "@/src/context/PostAddProvider";
import { PostAddProviderFile } from "@/src/context/PostAddProviderFile";

interface PostAddCardProps {
  reference?: string;
  children: React.ReactNode;
}

const PostDialog = ({ reference, children }: PostAddCardProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);

  // hydration trick
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Button disabled className="rounded-full bg-content px-3 py-2 text-bgc">
        {children}
      </Button>
    );
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="">
        <div className="rounded-full bg-content px-3 py-2 text-bgc">
          {children}
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-fgc/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2  px-4 shadow md:w-[800px]">
          <PostAddProviderFile>
            <PostAddProvider
              options={{
                reference: reference,
                maxCharacter: 200,
                onStatusChange: setOpen
              }}
            >
              <PostAddCard reference={reference} />
            </PostAddProvider>
          </PostAddProviderFile>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PostDialog;
