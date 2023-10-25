/**
 * TYPES
 */
import * as z from "zod";

//Unions//
export type AccountProviders = "google" | "credential" | "discord";
export type NavigationVariant = "home" | "account" | "profile";
export type LinkActionType = "followUser" | "unfollowUser";

export type UserTypes = "admin" | "user" | "dev";
export type ValidationType = "email";
export type GeneratorService = "crypto";
export type LogoType = "logout";
//-----//

//Keys Length//
const accountIDLen = Number(process.env.ACCOUNT_ID_LEN);
const userIDLen = Number(process.env.USER_ID_LEN);
const verifToken = Number(process.env.VERIFICATION_TOKEN_LEN);
const userRole = Number(process.env.USER_DEFAULT_ROLE);
const pictureIDLen = Number(process.env.Picture_ID_LEN);

export const ACCOUNT_ID_LEN = isNaN(accountIDLen) ? 12 : accountIDLen;
export const USER_ID_LEN = isNaN(userIDLen) ? 8 : userIDLen;
export const PICTURE_ID_LEN = isNaN(pictureIDLen) ? 15 : pictureIDLen;
export const USER_DEFAULT_ROLE = isNaN(userRole) ? 1 : userRole;
export const VERIFICATION_TOKEN_LEN = isNaN(verifToken) ? 10 : verifToken;
//--------//

//DB TYPES//
export type UserType = {
    id: string;
    name: string;
    email: string;
    image: string;
    created_at: Date;
    following?: boolean;
};

export type ReserveNameType = {
    input: {
        name: string;
        email: string;
    };
    output: {
        id: number;
    }[];
};

export type UserGetStrField = {
    self: string;
    field: "name" | "id" | "email" | "all";
    value: string;
};

export type UserFollowGetStrField = {
    self: string;
    field: "self" | "follow";
    value: string;
};

export type UserUpdateStrField = {
    field: "name" | "image";
    value: string;
    email: string;
};

export type UpdateFollowStrField = {
    type: "follow" | "unfollow";
    self: string;
    follow: string;
};

export type UserCreated = {
    field: "created_at";
    value: Date;
};

export type UserEmailVerified = {
    field: "emailVerified";
    value: Date;
};

export type FollowType = {
    name: string;
    image: string;
    following?: boolean;
};

export type GetUserFollowType = {
    input: UserFollowGetStrField;
    output: {
        data: FollowType;
        actions: LinkAction[];
    }[];
};

export type UpdateUserType = {
    input: UserUpdateStrField;
    output: {
        id: number;
    }[];
};

export type DBReturnType = {
    error?: unknown;
    data: unknown[];
};

//Actions//

export type LinkAction = {
    type: LinkActionType;
    link: string;
};

//Actionable//
export type GetUserType = {
    input: UserGetStrField;
    output: {
        data: UserType;
        actions: LinkAction[];
    };
};

//API TYPES//

export type APIMessage = {
    error: string;
    message: string;
};

export type APIContent = {
    error: string;
    content: unknown | null;
};

//AWS//
export type SignedType = {
    region: "eu-west-3" | "eu-central-1";
    bucket: string;
    key: string;
};

export type PutS3Type = {
    url: string;
    data: File;
};

//ZOD//

export const EmailRegistration = z.object({
    email: z.string().email()
});

export const EmailValidation = z.object({
    code: z.string().min(1, "Input needed")
});

//ERROR//

export type BaseError = {
    error: string;
    details: string;
};

export enum RequestErrorType {
    API_REQUEST_FAILED = "API request failed",
    API_AUTH_ERROR = "API authentication error",
    API_NOT_FOUND = "API resource not found",
    API_TIMEOUT = "API request timed out",
    API_RATE_LIMIT_EXCEEDED = "API rate limit exceeded",
    API_MISSING_ARG = "API request is missing some arguments",
    API_UNSUPPORTED_ACTION = "API actions not supported",

    DB_CONNECTION_ERROR = "Database connection error",
    DB_QUERY_FAILED = "Database query failed",
    DB_DUPLICATE_ENTRY = "Duplicate database entry",
    DB_RECORD_NOT_FOUND = "Database record not found",
    DB_TRANSACTION_ERROR = "Database transaction error"
}

// ------------Other-----------------------------------//
export type FormValidationType = {
    type: ValidationType;
    provider: AccountProviders;
};

//Type checking function//
export const isBaseError = (obj: unknown): obj is BaseError => {
    if (!obj) return false;
    return (
        typeof obj === "object" &&
        "error" in obj &&
        typeof obj.error === "string" &&
        "details" in obj
    );
};

// ----------- Lists ----------------------------------//

export const NameObjects = [
    "Cascade",
    "Phoenix",
    "Nebula",
    "Horizon",
    "Mirage",
    "Dragon",
    "Odyssey",
    "Pinnacle",
    "Comet",
    "Aurora",
    "Eclipse",
    "Infinity",
    "Zenith",
    "Serenity",
    "Apple",
    "Banana",
    "Cherry",
    "Grape",
    "Kiwi",
    "Mango",
    "Orange",
    "Peach",
    "Pear",
    "Strawberry",
    "Watermelon",
    "Pineapple",
    "Blueberry",
    "Raspberry",
    "Blackberry",
    "Radiant",
    "Whispering",
    "Majestic",
    "Vibrant",
    "Enchanted",
    "Luminous",
    "Mystical",
    "Serene",
    "Wandering",
    "Cosmic",
    "Tranquil",
    "Energetic",
    "Celestial",
    "Harmonious",
    "Galactic",
    "Lion",
    "Tiger",
    "Elephant",
    "Zebra",
    "Giraffe",
    "Kangaroo",
    "Panda",
    "Koala",
    "Hippopotamus",
    "Dolphin",
    "Octopus",
    "Butterfly",
    "Hawk",
    "Owl",
    "Turtle"
];
