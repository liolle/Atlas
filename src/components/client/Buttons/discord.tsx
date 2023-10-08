"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "@/src/components/ui/button";

const DiscordButton = () => {
    const handleSignOut = async () => {
        try {
            await signIn("discord", {
                redirect: true,
                callbackUrl: "/home"
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button className="" onClick={handleSignOut}>
            Sign with Discord
        </Button>
    );
};

DiscordButton.propTypes = {};

export default DiscordButton;
