import { FormSignIn } from "@/src/components/client/Forms/formSignIn";
import React from "react";
import { NextPage } from "next";
import PropTypes from "prop-types";
import GoogleButton from "@/src/components/client/Buttons/google";
import DiscordButton from "@/src/components/client/Buttons/discord";
import Link from "next/link";

const SignIn: NextPage = async () => {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-neutral-500 bg-cover ">
            <span>
                New user ? <Link href="/api/auth/signup">Sign up</Link>{" "}
            </span>{" "}
            <FormSignIn />
            <GoogleButton />
            <DiscordButton />
        </div>
    );
};

SignIn.propTypes = {
    providers: PropTypes.object.isRequired
};

export default SignIn;
