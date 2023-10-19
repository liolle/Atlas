import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import NextAuthProvider from "@/src/context/NextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Nextjs-template",
    description: "Reusable project starter"
};

export default async function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
            <body className={inter.className}>
                <Toaster reverseOrder={false} />
                <NextAuthProvider session={session}>
                    {children}
                </NextAuthProvider>
            </body>
        </html>
    );
}
