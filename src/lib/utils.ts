import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  ACCOUNT_ID_LEN,
  PICTURE_ID_LEN,
  POST_ID_LEN,
  USER_ID_LEN,
  VERIFICATION_TOKEN_LEN
} from "@/src/types";
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

export const generatePictureID = async () => {
  return cryptoGenerate(PICTURE_ID_LEN, "hex");
};

export const generateVToken = async () => {
  return cryptoGenerate(VERIFICATION_TOKEN_LEN, "hex");
};

export const generatePostID = async () => {
  return cryptoGenerate(POST_ID_LEN, "hex");
};

export const generateName = async () => {
  const randomObject =
    NameObjects[Math.floor(Math.random() * NameObjects.length)];
  return `${randomObject}${Math.floor(Math.random() * 9000) + 1000}`;
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
