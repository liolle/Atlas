"use client";
import React, {
    FormEvent,
    ChangeEvent,
    useRef,
    useState,
    Dispatch
} from "react";
import { Button } from "../ui/button";
import { ToastMessage } from "@/src/services/toast/toast";
import { X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
interface PostAddCardProps {
    maxCharacters: number;
    reference?: string;
    onStatusChange: Dispatch<React.SetStateAction<boolean>>;
}

const PostAddCard = ({
    maxCharacters,
    reference,
    onStatusChange
}: PostAddCardProps) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();
    const [characters, setCharacters] = useState(0);
    const [isSending, setIsSending] = useState(false);

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault;
        setCharacters(e.target.value.length);
    };

    const handlePost = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSending(true);
        if (!textAreaRef.current || textAreaRef.current.value == "") {
            setIsSending(false);
            return;
        }

        try {
            const response = await fetch("/api/posts", {
                method: "POST",
                body: JSON.stringify({
                    content: textAreaRef.current.value,
                    reference: reference || ""
                })
            });

            const result = await response.json();

            if (result.error) {
                ToastMessage(result.error.error);
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
        <form
            onSubmit={handlePost}
            className="  flex h-fit w-full  flex-col gap-4  overflow-hidden rounded-xl  border-2 border-accent-2 bg-bgc text-content "
        >
            <div className="flex select-none items-center justify-between px-4 pt-2">
                <Dialog.Close>
                    <X className=" cursor-pointer rounded-full hover:text-accent-1" />
                </Dialog.Close>
                <div>{`${characters}/${maxCharacters}`}</div>
            </div>
            <div className=" h-60 max-h-[208px] p-2 ">
                <textarea
                    className=" h-full w-full resize-none bg-bgc p-2 text-start text-content focus:outline-none"
                    placeholder="What's happening?"
                    maxLength={maxCharacters}
                    onChange={handleTextChange}
                    ref={textAreaRef}
                />
            </div>
            <div className="flex items-center justify-between border-t border-accent-2 ">
                <div className="flex w-full items-center justify-between px-4 py-2">
                    <div
                        className={` flex cursor-pointer flex-col items-center p-[1rem_0.5rem_1rem_0rem] text-accent-2 hover:text-accent-like `}
                    ></div>
                    <Button
                        disabled={isSending || characters == 0}
                        type="submit"
                        className=" w-16 select-none rounded-full bg-content px-3 py-1 text-bgc"
                    >
                        Post
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default PostAddCard;
