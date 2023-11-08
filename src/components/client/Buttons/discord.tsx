"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import DiscordIcon from "@/public/icon/discord.svg";
import { ToastMessage } from "@/src/services/toast/toast";

const DiscordButton = () => {
    const handleSignOut = async () => {
        try {
            await signIn("discord", {
                redirect: true,
                callbackUrl: "/home"
            });
        } catch (error) {
            ToastMessage(error as string);
        }
    };

    return (
        <Button className="flex justify-center gap-2" onClick={handleSignOut}>
            <Image
                className=" text-fgc"
                src={DiscordIcon.src}
                alt="G"
                width={25}
                height={25}
            />{" "}
            <span>Sign In with Discord</span>
        </Button>
    );
};

DiscordButton.propTypes = {};

export default DiscordButton;
