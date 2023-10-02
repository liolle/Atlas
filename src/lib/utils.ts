import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

import type { NextAuthOptions } from "next-auth";
// import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                pwd: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password"
                }
            },
            async authorize(credentials) {
                const res = await fetch("api/login/", {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                });
                const { content } = await res.json();

                if (!content) return null;

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const [headerBase64Url, payloadBase64Url, signature] =
                    content.split(".");

                const payloadJSON = Buffer.from(
                    payloadBase64Url,
                    "base64"
                ).toString("utf-8");
                const payload = JSON.parse(payloadJSON);

                const user = {
                    id: payload.id,
                    tag: payload.user_tag,
                    email: payload.email
                };

                if (res.ok && user) {
                    return user;
                }
                return null;
            }
        })
    ]
};
