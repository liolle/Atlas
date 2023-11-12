"use client";

import React, {
    ChangeEvent,
    FormEvent,
    MouseEvent,
    useRef,
    useState
} from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import Image from "next/image";
import { Label } from "../../ui/label";
import { ToastMessage } from "@/src/services/toast/toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { Camera } from "lucide-react";
import { isBaseError } from "@/src/types";
import AtlasClient from "@/src/services/atlas/client";

export function FormPictureUpload({ session }: { session: Session | null }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const { update } = useSession();
    const [isFetching, setIsFetching] = useState(false);
    const [changed, setChanged] = useState(false);
    const [imageUrl, setImageUrl] = useState(session?.user?.image);

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (
            !inputRef.current ||
            !inputRef.current.files ||
            !inputRef.current.files[0]
        )
            return;
        const selectedFile = inputRef.current.files[0];

        setIsFetching(true);
        try {
            const url = await AtlasClient.changeProfilePicture({
                file: selectedFile,
                session: session
            });

            if (isBaseError(url)) {
                ToastMessage(url.details);
                setIsFetching(false);
                return;
            }

            setIsFetching(false);
            setChanged(false);
            await update();

            ToastMessage("Update Successful", { variant: "success" });

            router.refresh();
        } catch (error) {
            ToastMessage(String(error));
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setChanged(true);
        if (!e.target || !e.target.files) return;
        const selectedFile = e.target.files[0];
        const imageUrl = URL.createObjectURL(selectedFile);
        setImageUrl(imageUrl);
    };

    const triggerInput = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!inputRef.current) return;
        inputRef.current.click();
    };

    return (
        <form onSubmit={onSubmit} className="flex  flex-col gap-4">
            <Label htmlFor="picture">Picture</Label>
            <Input
                ref={inputRef}
                className="hidden"
                type="file"
                accept="image/*"
                onChange={handleInputChange}
            />
            <div className=" flex w-96 items-center justify-between gap-8">
                <button
                    onClick={triggerInput}
                    type="button"
                    className=" relative  flex h-32 w-32 overflow-hidden rounded-full  "
                >
                    <div className=" absolute z-10 flex h-full w-full items-center justify-center rounded-full text-transparent  hover:bg-accent-2/25  hover:text-content ">
                        <Camera />
                    </div>
                    <Image
                        src={imageUrl as string}
                        alt="I"
                        fill
                        loading="eager"
                        className=" rounded-full"
                    />
                </button>
                <Button
                    disabled={isFetching || !changed}
                    className=" w-fit self-end"
                >
                    Update
                </Button>
            </div>
        </form>
    );
}
