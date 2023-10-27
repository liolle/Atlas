/* eslint-disable @typescript-eslint/no-unused-vars */
import { APIDispatcher } from "../lib/apiDispatcher";
import {
    APIResponse,
    GetUserFollowType,
    UpdateFollowStrField,
    UserGetStrField,
    UserUpdateStrField
} from "../types";
import { UnFollowUsers } from "./sql/follows/delete";
import { getFollow } from "./sql/follows/get";
import { FollowUsers } from "./sql/follows/post";
import { getAllUsers, getUsers } from "./sql/users/get";
import updateUser from "./sql/users/update";

export const GetUsers = async (
    options: UserGetStrField,
    APIResponse?: APIResponse
): Promise<APIResponse> => {
    const result =
        options.field == "all"
            ? await getAllUsers(options)
            : await getUsers(options);

    const response = APIResponse
        ? APIResponse
        : {
              version: "0.1",
              self: ""
          };

    if (!result) return response;

    APIDispatcher(response, result);

    return response;
};

export const UpdateUser = async (
    options: UserUpdateStrField,
    APIResponse?: APIResponse
): Promise<APIResponse> => {
    const result = await updateUser(options);

    const response = APIResponse
        ? APIResponse
        : {
              version: "0.1",
              self: ""
          };

    if (!result) return response;

    APIDispatcher(response, result);

    return response;
};

export const GetFollows = async (
    options: GetUserFollowType["input"],
    APIResponse?: APIResponse
): Promise<APIResponse> => {
    const result = await getFollow(options);

    const response = APIResponse
        ? APIResponse
        : {
              version: "0.1",
              self: ""
          };

    if (!result) return response;
    APIDispatcher(response, result);
    return response;
};

export const UpdateFollows = async (
    options: UpdateFollowStrField,
    APIResponse?: APIResponse
): Promise<APIResponse> => {
    const result =
        options.type == "follow"
            ? await FollowUsers(options)
            : await UnFollowUsers(options);

    const response = APIResponse
        ? APIResponse
        : {
              version: "0.1",
              self: ""
          };

    if (!result) return response;

    APIDispatcher(response, result);

    return response;
};
