import { FormSignUp } from "@/src/components/client/Forms/formSignup";
import Link from "next/link";
import React from "react";

export default function SignUp() {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-neutral-500 bg-cover ">
            <span>
                Already have an account{" "}
                <Link href="/api/auth/signin">Sign in</Link>{" "}
            </span>{" "}
            <FormSignUp />
        </div>
    );
}
