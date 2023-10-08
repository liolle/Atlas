import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password"
                }
            },
            async authorize(credentials) {
                /**TODO**/
                // call App API
                // should provide email, id, image if right credentials used, null otherwise.

                const DB_INFO = {
                    id: "12",
                    email: "test@test.com",
                    name: "test",
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGHOPHIzqS77fiC2ilAL47ukQjdrptonPHxQ&usqp=CAU",
                    role: "dev",
                    password: "test"
                };

                const user = {
                    id: "12",
                    email: "test@test.com",
                    name: "test",
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGHOPHIzqS77fiC2ilAL47ukQjdrptonPHxQ&usqp=CAU",
                    role: "dev"
                };

                if (
                    credentials?.email === user.email &&
                    credentials?.password === DB_INFO.password
                ) {
                    return { ...user, apiToken: "testToken" };
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            const sanitizedToken = Object.keys(token).reduce((p, c) => {
                // strip unnecessary properties
                if (
                    c !== "iat" &&
                    c !== "exp" &&
                    c !== "jti" &&
                    c !== "apiToken"
                ) {
                    return { ...p, [c]: token[c] };
                } else {
                    return p;
                }
            }, {});
            return {
                ...session,
                user: sanitizedToken,
                apiToken: token.apiToken
            };
        },
        async jwt({ token }) {
            return token;
        }
    }
};
