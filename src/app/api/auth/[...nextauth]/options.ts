import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import CustomDrizzleAdapter from "@/src/db/adapters";
import EmailProvider from "next-auth/providers/email";
import { dzClient } from "@/src/db";
import { sendVerificationRequest } from "@/src/services/email/nodemailer";
import { generateName, generateVToken } from "@/src/lib/utils";
import { GetUsers } from "@/src/db/portal";
import { UserType } from "@/src/types";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60 // 24 hours
  },
  adapter: CustomDrizzleAdapter(dzClient),
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

      async sendVerificationRequest(param) {
        try {
          await sendVerificationRequest(param);
        } catch (error) {
          console.log(String(error));
        }
      },
      maxAge: 60 * 5
    })
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ user }) {
      if (user) {
        user.name = await generateName();
      }
      return true;
    },
    async jwt({ token, trigger }) {
      if (trigger === "update") {
        const email = token.email;
        if (!email) return token;

        const dbUser = await GetUsers({
          input: {
            self: " ",
            field: "email",
            value: email
          }
        });

        if (dbUser.data && dbUser.data.content.length > 0) {
          const data = dbUser.data.content[0].item as UserType;
          const name = data.name;
          const image = data.image;

          if (name) token.name = name;
          if (image) token.picture = image;
        }
      }

      return token;
    }
  }
};
