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
    title: "Atlas",
    description: "Share your thoughts, updates, and insights in real-time",
    metadataBase: new URL("https://atlas-vertex.vercel.app"),
    alternates: {
        canonical: "/"
    }
};

export default async function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    return (
        <html className=" bg-bgc" lang="en">
            <body className={` @container ${inter.className}`}>
                <Toaster reverseOrder={false} />
                <NextAuthProvider session={session}>
                    {children}
                </NextAuthProvider>
            </body>
        </html>
    );
}
