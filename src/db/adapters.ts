/* eslint-disable @typescript-eslint/no-unused-vars */
import { and, eq } from "drizzle-orm";
import { PgDatabase } from "drizzle-orm/pg-core";
import {
    Adapter,
    AdapterAccount,
    AdapterSession,
    AdapterUser,
    VerificationToken
} from "next-auth/adapters";
import { accounts, sessions, users, verificationTokens } from "./schema";
/** @return { import("next-auth/adapters").Adapter } */
export default function CustomDrizzleAdapter(
    client: InstanceType<typeof PgDatabase>,
    options = {}
): Adapter {
    return {
        async createUser(user: Omit<AdapterUser, "id">): Promise<AdapterUser> {
            return (await client
                .insert(users)
                .values({ ...user, id: crypto.randomUUID() })
                .returning()
                .then((res: unknown[]) => res[0] ?? null)) as AdapterUser;
        },

        async getUser(id: string): Promise<AdapterUser | null> {
            return (await client
                .select()
                .from(users)
                .where(eq(users.id, id))
                .then(
                    (res: unknown[]) => res[0] ?? null
                )) as AdapterUser | null;
        },
        async getUserByEmail(email: string): Promise<AdapterUser | null> {
            return (await client
                .select()
                .from(users)
                .where(eq(users.email, email))
                .then(
                    (res: unknown[]) => res[0] ?? null
                )) as AdapterUser | null;
        },
        async getUserByAccount({
            providerAccountId,
            provider
        }): Promise<AdapterUser | null> {
            const dbAccount =
                (await client
                    .select()
                    .from(accounts)
                    .where(
                        and(
                            eq(accounts.providerAccountId, providerAccountId),
                            eq(accounts.provider, provider)
                        )
                    )
                    .leftJoin(users, eq(accounts.userId, users.id))
                    .then((res) => res[0])) ?? null;

            if (!dbAccount) {
                return null;
            }

            return dbAccount.user;
        },
        async updateUser(
            user: Partial<AdapterUser> & Pick<AdapterUser, "id">
        ): Promise<AdapterUser> {
            if (!user.id) {
                throw new Error("No user id.");
            }

            return (await client
                .update(users)
                .set(user)
                .where(eq(users.id, user.id))
                .returning()
                .then((res) => res[0])) as AdapterUser;
        },
        async deleteUser(userId: string): Promise<AdapterUser | null> {
            return (await client
                .delete(users)
                .where(eq(users.id, userId))
                .returning()
                .then((res) => res[0] ?? null)) as AdapterUser | null;
        },
        async linkAccount(
            rawAccount: AdapterAccount
        ): Promise<AdapterAccount | null | undefined> {
            const updatedAccount = await client
                .insert(accounts)
                .values(rawAccount)
                .returning()
                .then((res: unknown[]) => res[0]);

            // Drizzle will return `null` for fields that are not defined.
            // However, the return type is expecting `undefined`.
            // const account = {
            //     ...updatedAccount,
            //     access_token: updatedAccount.access_token ?? undefined,
            //     token_type: updatedAccount.token_type ?? undefined,
            //     id_token: updatedAccount.id_token ?? undefined,
            //     refresh_token: updatedAccount.refresh_token ?? undefined,
            //     scope: updatedAccount.scope ?? undefined,
            //     expires_at: updatedAccount.expires_at ?? undefined,
            //     session_state: updatedAccount.session_state ?? undefined
            // };

            return updatedAccount as AdapterAccount;
        },
        async unlinkAccount(
            account: Pick<AdapterAccount, "provider" | "providerAccountId">
        ): Promise<AdapterAccount | undefined> {
            const { type, provider, providerAccountId, userId } = (await client
                .delete(accounts)
                .where(
                    and(
                        eq(
                            accounts.providerAccountId,
                            account.providerAccountId
                        ),
                        eq(accounts.provider, account.provider)
                    )
                )
                .returning()
                .then((res: unknown[]) => res[0] ?? null)) as AdapterAccount;

            return { provider, type, providerAccountId, userId };
        },
        async createSession(data: {
            sessionToken: string;
            userId: string;
            expires: Date;
        }): Promise<AdapterSession> {
            return (await client
                .insert(sessions)
                .values(data)
                .returning()
                .then((res: unknown[]) => res[0])) as AdapterSession;
        },
        async getSessionAndUser(
            sessionToken: string
        ): Promise<{ session: AdapterSession; user: AdapterUser } | null> {
            return (await client
                .select({
                    session: sessions,
                    user: users
                })
                .from(sessions)
                .where(eq(sessions.sessionToken, sessionToken))
                .innerJoin(users, eq(users.id, sessions.userId))
                .then((res: unknown[]) => res[0] ?? null)) as {
                session: AdapterSession;
                user: AdapterUser;
            } | null;
        },
        async updateSession(
            data: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
        ): Promise<AdapterSession | null | undefined> {
            return (await client
                .update(sessions)
                .set(data)
                .where(eq(sessions.sessionToken, data.sessionToken))
                .returning()
                .then((res: unknown[]) => res[0])) as
                | AdapterSession
                | null
                | undefined;
        },
        async deleteSession(
            sessionToken: string
        ): Promise<AdapterSession | null | undefined> {
            const session = await client
                .delete(sessions)
                .where(eq(sessions.sessionToken, sessionToken))
                .returning()
                .then((res: unknown[]) => res[0] ?? null);

            return session as AdapterSession | null | undefined;
        },
        async createVerificationToken(
            token: VerificationToken
        ): Promise<VerificationToken | null | undefined> {
            return await client
                .insert(verificationTokens)
                .values(token)
                .returning()
                .then((res) => res[0]);
        },
        async useVerificationToken(token: {
            identifier: string;
            token: string;
        }): Promise<VerificationToken | null> {
            try {
                return await client
                    .delete(verificationTokens)
                    .where(
                        and(
                            eq(verificationTokens.identifier, token.identifier),
                            eq(verificationTokens.token, token.token)
                        )
                    )
                    .returning()
                    .then((res) => res[0] ?? null);
            } catch (err) {
                throw new Error("No verification token found.");
            }
        }
    };
}
