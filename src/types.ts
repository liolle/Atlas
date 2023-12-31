/**
 * TYPES
 */
import * as z from "zod";

//Unions//
export type AccountProviders = "google" | "credential" | "discord";
export type NavigationVariant = "home" | "account" | "profile";
export type LinkActionType = "followUser" | "unfollowUser" | "like";
export type ActiveProfileTab = "posts" | "groups" | "follows" | "followers";

export type ValidationType = "email";
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
  reference?: string;
  content: string;
  comments: number;
  likes: number;
  created_at: Date;
  owner: string;
  image: string;
  liked: boolean;
  files?: string[];
};

export type SQLInterfaceOptions = {
  mocked: boolean;
  mockValue: UserType[] | FollowType[] | PostType[] | APIMessage | null;
};

//-->Create

export type AddPostInput = {
  id: string;
  reference?: string;
  owner: string;
  content: string;
  files: string[];
};

export type AddMediaInput = {
  id: string;
  link: string;
};

export type LikeXInput = {
  type: "posts" | "comments" | "reply";
  id: string;
  name: string;
};

//-->Read

export type GetUserInput = {
  self: string;
  field: "name" | "id" | "email" | "all";
  value?: string;
};

export type GetUserFollowInput = {
  self: string;
  field: "self" | "follow";
  value: string;
};

export type GetPostInput = {
  self: string;
  field: "owner" | "id" | "all";
  reference?: string | null;
  value: string;
};

//-->Update

export type UpdateUserInput = {
  field: "name" | "image";
  value: string;
  email: string;
};

export type UpdateFollowInput = {
  type: "follow" | "unfollow";
  self: string;
  follow: string;
};

//Actions//

export type LinkAction = {
  type: LinkActionType;
  link: string;
};

export type PostTypeElement = {
  actions: LinkAction[];
  item: PostType;
};

//API TYPES//

export type APIMessage = {
  type: "UpdateUser" | "UpdateFollow" | "AddUser" | "AddPost" | "Like";
  message: string;
  content?: string;
};

export type APIDataTypesName =
  | "user"
  | "posts"
  | "comment"
  | "reply"
  | "follows";

export type APIDataTypes = UserType | FollowType | PostType;

export type APIPaginationType = {
  first?: string;
  last?: string;
  next?: string;
  pages?: number;
  limit: number;
  index: number;
};

export type APIOptions = {
  pagination?: APIPaginationType;
};

export type APIResponse = {
  version: string;
  self: string;
  error?: {
    error: string;
    details: string;
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
    pagination: APIPaginationType;
  };
  message?: APIMessage;
};

//AWS//

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

export const isAPIMessage = (obj: unknown): obj is APIMessage => {
  if (!obj) return false;
  return (
    typeof obj === "object" &&
    "type" in obj &&
    typeof obj.type === "string" &&
    "message" in obj &&
    typeof obj.message === "string"
  );
};

export const isPostType = (obj: unknown): obj is PostType => {
  if (!obj) return false;
  return (
    typeof obj === "object" &&
    "comments" in obj &&
    "content" in obj &&
    "created_at" in obj &&
    "id" in obj &&
    "image" in obj &&
    "liked" in obj &&
    "likes" in obj &&
    "owner" in obj &&
    "reference" in obj &&
    typeof obj.comments === "number" &&
    typeof obj.content === "string" &&
    typeof obj.created_at === "object" &&
    typeof obj.id === "string" &&
    typeof obj.image === "string" &&
    typeof obj.likes === "number" &&
    typeof obj.liked === "boolean" &&
    typeof obj.owner === "string" &&
    typeof obj.reference === "string"
  );
};

export const isAPIPaginationType = (obj: unknown): obj is APIPaginationType => {
  if (!obj) return false;
  return (
    typeof obj === "object" &&
    "index" in obj &&
    "limit" in obj &&
    typeof obj.index === "number" &&
    typeof obj.index === "number"
  );
};

export const isApiOption = (obj: unknown): obj is APIOptions => {
  if (!obj) return false;
  if (typeof obj !== "object") return false;
  const keys = Object.keys(obj);
  if (keys.length > 1 || (keys.length == 1 && !("pagination" in obj)))
    return false;

  // optional pagination
  if ("pagination" in obj) {
    const pagination = (obj as APIOptions).pagination;
    if (!pagination) return true;
    if (!isAPIPaginationType(pagination)) return false;
  }

  return true;
};
