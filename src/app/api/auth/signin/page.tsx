import { FormSignIn } from "@/src/components/client/Forms/formSignIn";
import Link from "next/link";
import React from "react";

export default function SignIn() {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-neutral-500 bg-cover ">
            <span>
                New user ?{" "}
                <Link href="/api/auth/signup">Sign up for an account</Link>
            </span>

            <FormSignIn />
        </div>
    );
}
