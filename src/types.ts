/**
 * TYPES
 */
import * as z from "zod";

export type AccountProviders = "google" | "credential" | "discord";
export type UserTypes = "admin" | "user" | "dev";
export type GeneratorService = "crypto";
export type ValidationType = "email" | "test";
export type NavigationVariant = "home";

const accountIDLen = Number(process.env.ACCOUNT_ID_LEN);
const userIDLen = Number(process.env.USER_ID_LEN);
const verifToken = Number(process.env.VERIFICATION_TOKEN_LEN);
const userRole = Number(process.env.USER_DEFAULT_ROLE);

export const ACCOUNT_ID_LEN = isNaN(accountIDLen) ? 12 : accountIDLen;
export const USER_ID_LEN = isNaN(userIDLen) ? 8 : userIDLen;
export const USER_DEFAULT_ROLE = isNaN(userRole) ? 1 : userRole;
export const VERIFICATION_TOKEN_LEN = isNaN(verifToken) ? 10 : verifToken;

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
    content: RawLoginReturnType | LoginReturnType | unknown | null;
};

// ------------ZOD-----------------------------------//

export const EmailRegistration = z.object({
    email: z.string().email()
});

export const EmailValidation = z.object({
    code: z.string().min(1, "Input needed")
});

// ------------Other-----------------------------------//
export type FormValidationType = {
    type: ValidationType;
    provider: AccountProviders;
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
