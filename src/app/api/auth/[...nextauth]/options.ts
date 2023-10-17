import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import EmailProvider from "next-auth/providers/email";
import { dzClient } from "@/src/db";
import { sendVerificationRequest } from "@/src/services/nodemailer";
import { generateVToken } from "@/src/lib/utils";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60 // 24 hours
    },
    adapter: DrizzleAdapter(dzClient),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string
        }),
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM,

            async generateVerificationToken() {
                const vToken = await generateVToken();
                return vToken;
            },

            sendVerificationRequest(param) {
                sendVerificationRequest(param);
            },
            maxAge: 60 * 5
        })
    ],
    callbacks: {
        async session({ session }) {
            return session;
        }
    }
};
