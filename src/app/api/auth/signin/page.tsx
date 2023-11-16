import { FormSignIn } from "@/src/components/client/Forms/formSignIn";
import React from "react";
import { NextPage } from "next";
import GoogleButton from "@/src/components/client/Buttons/google";
import { Separator } from "@/src/components/ui/separator";
import DiscordButton from "@/src/components/client/Buttons/discord";
// import Link from "next/link";

const SignIn: NextPage = async () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2 bg-bgc ">
      <section className=" flex min-w-[350px] flex-col gap-4 rounded-lg bg-fgc px-8 py-8 shadow-xl">
        <FormSignIn />
        <div className=" itc flex w-full max-w-full items-center gap-1 text-accent-2">
          <Separator className=" flex-1 bg-accent-2" />
          <span>or</span>
          <Separator className=" flex-1 bg-accent-2" />
        </div>
        <GoogleButton />
        <DiscordButton />
      </section>
    </main>
  );
};

export default SignIn;
