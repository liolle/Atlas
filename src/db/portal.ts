/* eslint-disable @typescript-eslint/no-unused-vars */
import { APIDispatcher } from "../lib/apiDispatcher";
import { generatePostID } from "../lib/utils";
import {
    APIResponse,
    AddPostInput,
    AddPostOutput,
    GetPostInput,
    GetUserFollowType,
    LikeXInput,
    UpdateFollowStrField,
    UserGetStrField,
    UserUpdateStrField
} from "../types";
import { UnFollowUsers } from "./sql/follows/delete";
import { getFollow } from "./sql/follows/get";
import { FollowUsers } from "./sql/follows/post";
import { likeX } from "./sql/likes/post";
import { getAllPosts, getPost } from "./sql/posts/get";
import { addPost } from "./sql/posts/post";
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

    const res = APIDispatcher(response, result);
    if (res.error) return res;

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

    const res = APIDispatcher(response, result);
    if (res.error) return res;

    return response;
};

export const AddPost = async (
    options: AddPostInput,
    APIResponse?: APIResponse
): Promise<APIResponse> => {
    const id = await generatePostID();
    options.id = id;

    const result = addPost(options);

    const response = APIResponse
        ? APIResponse
        : {
              version: "0.1",
              self: ""
          };

    if (!result) return response;

    const res = APIDispatcher(response, result);
    if (res.error) return res;

    return response;
};

export const GetPosts = async (
    options: GetPostInput,
    APIResponse?: APIResponse
): Promise<APIResponse> => {
    const result =
        options.field == "all"
            ? await getAllPosts(options)
            : await getPost(options);

    const response = APIResponse
        ? APIResponse
        : {
              version: "0.1",
              self: ""
          };

    if (!result) return response;

    const res = APIDispatcher(response, result);
    if (res.error) return res;

    return response;
};

export const LikeX = async (
    options: LikeXInput,
    APIResponse?: APIResponse
): Promise<APIResponse> => {
    const result = likeX(options);

    const response = APIResponse
        ? APIResponse
        : {
              version: "0.1",
              self: ""
          };

    if (!result) return response;

    const res = APIDispatcher(response, result);
    if (res.error) return res;

    return response;
};
