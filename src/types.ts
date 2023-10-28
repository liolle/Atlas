/**
 * TYPES
 */
import * as z from "zod";

//Unions//
export type AccountProviders = "google" | "credential" | "discord";
export type NavigationVariant = "home" | "account" | "profile";
export type LinkActionType = "followUser" | "unfollowUser" | "like";
export type ActiveProfileTab = "posts" | "groups" | "follows" | "followers";

export type UserTypes = "admin" | "user" | "dev";
export type ValidationType = "email";
export type GeneratorService = "crypto";
export type LogoType = "logout";
export const APIVersion = "v0.1";
//-----//

//Keys Length//
const accountIDLen = Number(process.env.ACCOUNT_ID_LEN);
const userIDLen = Number(process.env.USER_ID_LEN);
const verifToken = Number(process.env.VERIFICATION_TOKEN_LEN);
const userRole = Number(process.env.USER_DEFAULT_ROLE);
const pictureIDLen = Number(process.env.Picture_ID_LEN);
const postIDLen = Number(process.env.POST_ID_LEN);

export const ACCOUNT_ID_LEN = isNaN(accountIDLen) ? 12 : accountIDLen;
export const USER_ID_LEN = isNaN(userIDLen) ? 8 : userIDLen;
export const POST_ID_LEN = isNaN(postIDLen) ? 20 : postIDLen;
export const PICTURE_ID_LEN = isNaN(pictureIDLen) ? 15 : pictureIDLen;
export const USER_DEFAULT_ROLE = isNaN(userRole) ? 1 : userRole;
export const VERIFICATION_TOKEN_LEN = isNaN(verifToken) ? 10 : verifToken;
//--------//

//DB TYPES//

//-->Entity
export type UserType = {
    id: string;
    name: string;
    email: string;
    image: string;
    created_at: Date;
    following?: boolean;
};
export type FollowType = {
    name: string;
    image: string;
    following?: boolean;
};

export type PostType = {
    id: string;
    content: string;
    comments: number;
    likes: number;
    created_at: Date;
    owner: string;
    image: string;
    liked: boolean;
};

//-->Create

export type AddPostInput = {
    id: string;
    owner: string;
    content: string;
    files: string[];
};

export type AddPostOutput = BaseError | null;

export type LikeXInput = {
    type: "posts" | "comments" | "reply";
    id: string;
    name: string;
};

//-->Read

export type UserGetStrField = {
    self: string;
    field: "name" | "id" | "email" | "all";
    value: string;
};

export type GetPostInput = {
    self: string;
    field: "owner" | "id" | "all";
    value: string;
};

//-->Update

//-->Delete

export type DeletePostInput = {
    id: string;
};

//DB TYPES//

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

export type APIDataTypesName =
    | "user"
    | "posts"
    | "comment"
    | "reply"
    | "follows";

export type APIDataTypes = UserType | FollowType | PostType;

export type APIResponse = {
    version: string;
    self: string;
    error?: {
        error: string;
        detail: string;
    };
    data?: {
        type: APIDataTypesName;
        count: number;
        content: {
            actions: LinkAction[];
            item: APIDataTypes;
        }[];
    };
    rel?: {
        pagination: {
            first: string;
            last: string;
            next: string;
            pages: number;
            limit: number;
            index: number;
        };
    };
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

export const isUserType = (obj: unknown): obj is UserType => {
    if (!obj) return false;
    return (
        typeof obj === "object" &&
        "name" in obj &&
        typeof obj.name === "string" &&
        "email" in obj &&
        typeof obj.email === "string" &&
        "image" in obj &&
        typeof obj.image === "string" &&
        "created_at" in obj &&
        typeof obj.created_at === "object" &&
        "following" in obj &&
        typeof obj.following === "boolean"
    );
};

export const isFollowType = (obj: unknown): obj is FollowType => {
    if (!obj) return false;
    return (
        typeof obj === "object" &&
        "name" in obj &&
        typeof obj.name === "string" &&
        "image" in obj &&
        typeof obj.name === "string" &&
        "following" in obj &&
        typeof obj.following === "boolean"
    );
};

export const isPostType = (obj: unknown): obj is PostType => {
    if (!obj) return false;
    return (
        typeof obj === "object" &&
        "content" in obj &&
        typeof obj.content === "string" &&
        "comments" in obj &&
        typeof obj.comments === "number" &&
        "likes" in obj &&
        typeof obj.likes === "number" &&
        "owner" in obj &&
        typeof obj.owner === "string" &&
        "image" in obj &&
        typeof obj.image === "string" &&
        "liked" in obj &&
        typeof obj.liked === "boolean" &&
        "created_at" in obj &&
        typeof obj.created_at === "object" &&
        "id" in obj &&
        typeof obj.id === "string"
    );
};

// export type PostType = {
//     content: string;
//     comments: number;
//     likes: number;
//     created_at: Date;
//     owner: string;
//     image: string;
//     liked: boolean;
// };

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
