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
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

import { Label } from "../../ui/label";
import { ToastMessage } from "@/src/services/toast/toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import Loading from "../loading/loading";
import { generatePictureID } from "@/src/lib/utils";
import UploadServiceClient from "@/src/services/aws/client/clientSafe";

export function FormPictureUpload({ session }: { session: Session | null }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const { update } = useSession();
    const [isFetching, setIsFetching] = useState(false);
    const [imageUrl, setImageUrl] = useState(session?.user?.image);

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!inputRef.current || !inputRef.current.files) return;
        const selectedFile = inputRef.current.files[0];

        const extention = selectedFile.name.split(".").pop();
        setIsFetching(true);
        try {
            const generated_key = await generatePictureID();

            const response = await fetch("/api/services/presignedUrl", {
                method: "POST",
                body: JSON.stringify({
                    key: `${generated_key}.${extention}`
                })
            });

            const data = await response.json();

            const { url, cdn, key } = data;

            await UploadServiceClient.putS3({
                url: url as string,
                data: selectedFile
            });

            const result = await fetch("/api/users", {
                method: "POST",
                body: JSON.stringify({
                    field: "image",
                    value: `https://${cdn}/${key}`,
                    email: session?.user?.email
                })
            });

            if (!result.ok) {
                const { error, details } = await response.json();
                details ? ToastMessage(details) : ToastMessage(error);
                return;
            }
            setIsFetching(false);

            await update();

            ToastMessage("Update Successful", { variant: "success" });

            router.refresh();
        } catch (error) {
            ToastMessage(String(error));
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
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
                    className="relative h-32 w-32 rounded-full"
                >
                    <Avatar>
                        <AvatarImage
                            className=" h-full"
                            src={imageUrl as string}
                        />
                        <AvatarFallback>
                            <Loading />
                        </AvatarFallback>
                    </Avatar>
                </button>
                <Button disabled={isFetching} className=" w-fit self-end">
                    Update
                </Button>
            </div>
        </form>
    );
}
