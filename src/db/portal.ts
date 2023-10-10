import { APIContent, APIMessage, LoginType, SignUpType } from "../types";
import LOGIN from "./sql/login";
import SIGNUP from "./sql/signup";

export const QuerySignUP = async (options: SignUpType): Promise<APIMessage> => {
    return SIGNUP(options);
};

export const QueryLogin = async (options: LoginType): Promise<APIContent> => {
    return LOGIN(options);
};
