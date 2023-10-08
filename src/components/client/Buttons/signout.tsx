"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({ redirect: false });

        router.push("/");
    };

    return <Button onClick={handleSignOut}>Sign out</Button>;
};

SignOutButton.propTypes = {};

export default SignOutButton;
