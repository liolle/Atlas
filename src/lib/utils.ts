import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ACCOUNT_ID_LEN, USER_ID_LEN, VERIFICATION_TOKEN_LEN } from "../types";
import { cryptoGenerate } from "./generator";
import bcrypt from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const generateUserID = async () => {
    return cryptoGenerate(USER_ID_LEN);
};

export const generateAccountID = async () => {
    return cryptoGenerate(ACCOUNT_ID_LEN);
};

export const generateVToken = async () => {
    return cryptoGenerate(VERIFICATION_TOKEN_LEN, "hex");
};

export const hashPassword = async (password: string) => {
    return bcrypt.hashSync(password);
};

export const comparePassword = async (
    password: string,
    hashedPassword: string
) => {
    return bcrypt.compareSync(password, hashedPassword);
};

export const API_URL = `${process.env.API_URL || "http://localhost:3000"}`;
