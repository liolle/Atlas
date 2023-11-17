"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import GoogleIcon from "@/public/icon/google.svg";
import { ToastMessage } from "@/src/services/toast/toast";

const GoogleButton = () => {
  const handleSignOut = async () => {
    try {
      await signIn("google", {
        redirect: true,
        callbackUrl: "/home"
      });
    } catch (error) {
      //TODO toast
      ToastMessage(error as string);
    }
  };

  return (
    <Button className="flex justify-center gap-2" onClick={handleSignOut}>
      <Image
        className=" text-fgc"
        src={GoogleIcon.src}
        alt="G"
        width={25}
        height={25}
      />{" "}
      <span>Sign In with google</span>
    </Button>
  );
};

GoogleButton.propTypes = {};

export default GoogleButton;
