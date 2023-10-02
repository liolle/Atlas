"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Loading from "@/src/components/client/loading/loading";
import { useSession } from "next-auth/react";

export default function Login() {
    const router = useRouter();
    // const { data: session, status } = useSession();
    const { status } = useSession();

    useEffect(() => {
        if (status !== "authenticated")
            return router.replace("/api/auth/signin");
        router.push("/home");
    }, [status]);

    return (
        <div className="bg-main-background flex h-screen items-center justify-center bg-cover p-10">
            <Loading />
        </div>
    );
}
