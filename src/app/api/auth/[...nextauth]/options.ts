import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import { APIContent, LoginReturnType } from "@/src/types";
import { API_URL } from "@/src/lib/utils";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            name: "google"
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
                if (
                    !credentials ||
                    !credentials.email ||
                    !credentials.password
                ) {
                    return null;
                }

                try {
                    const response = await fetch(
                        `${API_URL}/api/accounts/login`,
                        {
                            method: "POST",
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password
                            })
                        }
                    );

                    const data: APIContent = await response.json();

                    const { error, content } = data as {
                        error: string;
                        content: LoginReturnType;
                    };

                    if (!response.ok || !content) {
                        console.log(error);
                        return null;
                    }

                    return {
                        id: content.user_id,
                        email: credentials.email,
                        image: content.picture,
                        role: content.role,
                        created_at: content.user_created_at,
                        name: content.username
                    };
                } catch (error) {
                    console.log(error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            /*TODO*/
            // normalize the return value
            const sanitizedToken = Object.keys(token).reduce((p, c) => {
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async signIn({ user, account, profile, email, credentials }) {
            //TODO
            // check email verified here
            // sync with db here

            if (account?.provider == "google") {
                return true;
            }

            if (account?.provider == "discord") {
                return true;
            }

            return true;
        },
        async jwt({ token }) {
            return token;
        }
    }
};
