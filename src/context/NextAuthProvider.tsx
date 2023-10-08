"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Session } from "next-auth";

interface Props {
    children: ReactNode;
    session: Session | null;
}

export default function NextAuthProvider({ children, session }: Props) {
    return <SessionProvider session={session}>{children}</SessionProvider>;
}
