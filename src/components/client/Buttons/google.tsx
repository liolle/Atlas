"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "@/src/components/ui/button";

const GoogleButton = () => {
    const handleSignOut = async () => {
        try {
            await signIn("google", {
                redirect: true,
                callbackUrl: "/home"
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button className="" onClick={handleSignOut}>
            Sign with google
        </Button>
    );
};

GoogleButton.propTypes = {};

export default GoogleButton;
