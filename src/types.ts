/**
 * TYPES
 */
export type AccountProviders = "google" | "credential" | "discord";
export type UserTypes = "admin" | "user" | "dev";
export type GeneratorService = "crypto";

const accountIDLen = Number(process.env.ACCOUNT_ID_LEN);
const userIDLen = Number(process.env.USER_ID_LEN);
const userRole = Number(process.env.USER_DEFAULT_ROLE);

export const ACCOUNT_ID_LEN = isNaN(accountIDLen) ? 12 : accountIDLen;
export const USER_ID_LEN = isNaN(userIDLen) ? 8 : userIDLen;
export const USER_DEFAULT_ROLE = isNaN(userRole) ? 1 : userRole;

// ------------DB TYPES-----------------------------------//

export type SignUpType = {
    email: string;
    provider: AccountProviders;
    password: string;
    username: string;
};

export type LoginType = {
    email: string;
    password: string;
};

export type RawLoginReturnType = {
    user_id: string;
    email: string;
    username: string;
    user_created_at: string;
    password: string;
    role: string;
    picture: string;
};

export type LoginReturnType = {
    user_id: string;
    email: string;
    username: string;
    user_created_at: string;
    role: string;
    picture: string;
};

// ------------API TYPES-----------------------------------//

export type APIMessage = {
    error: string;
    message: string;
};

export type APIContent = {
    error: string;
    content: RawLoginReturnType | LoginReturnType | null;
};
