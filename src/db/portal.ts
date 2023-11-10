/* eslint-disable @typescript-eslint/no-unused-vars */
import { APIDispatcher } from "../lib/apiDispatcher";
import { generatePostID } from "../lib/utils";
import {
    APIOptions,
    APIResponse,
    APIVersion,
    AddPostInput,
    GetPostInput,
    GetUserInput,
    LikeXInput,
    UpdateFollowInput,
    GetUserFollowInput,
    UpdateUserInput
} from "../types";
import { UnFollowUsers } from "./sql/follows/delete";
import { getFollow } from "./sql/follows/get";
import { FollowUsers } from "./sql/follows/post";
import { likeX } from "./sql/likes/post";
import { getAllPosts, getPost } from "./sql/posts/get";
import { addPost } from "./sql/posts/post";
import { getAllUsers, getUsers } from "./sql/users/get";
import updateUser from "./sql/users/update";

interface GetUsersProps {
    input: GetUserInput;
    APIResponse?: APIResponse;
    options?: APIOptions;
}

export const GetUsers = async ({
    input,
    APIResponse,
    options
}: GetUsersProps): Promise<APIResponse> => {
    const result =
        input.field == "all" ? await getAllUsers(input) : await getUsers(input);

    const response = APIResponse
        ? APIResponse
        : {
              version: APIVersion,
              self: ""
          };

    if (!result) return response;

    new APIDispatcher(response).dispatch(result);

    return response;
};

interface UpdateUserProps {
    input: UpdateUserInput;
    APIResponse?: APIResponse;
    options?: APIOptions;
}

export const UpdateUser = async ({
    input,
    APIResponse,
    options
}: UpdateUserProps): Promise<APIResponse> => {
    const result = await updateUser(input);

    const response = APIResponse
        ? APIResponse
        : {
              version: APIVersion,
              self: ""
          };

    console.log("Res:", result);

    if (!result) return response;

    new APIDispatcher(response).dispatch(result);

    return response;
};

interface GetFollowsProps {
    input: GetUserFollowInput;
    APIResponse?: APIResponse;
    options?: APIOptions;
}

export const GetFollows = async ({
    input,
    APIResponse,
    options
}: GetFollowsProps): Promise<APIResponse> => {
    const result = await getFollow(input);

    const response = APIResponse
        ? APIResponse
        : {
              version: APIVersion,
              self: ""
          };

    if (!result) return response;

    new APIDispatcher(response).dispatch(result);

    return response;
};

interface UpdateFollowsProps {
    input: UpdateFollowInput;
    APIResponse?: APIResponse;
    options?: APIOptions;
}

export const UpdateFollows = async ({
    input,
    APIResponse,
    options
}: UpdateFollowsProps): Promise<APIResponse> => {
    const result =
        input.type == "follow"
            ? await FollowUsers(input)
            : await UnFollowUsers(input);

    const response = APIResponse
        ? APIResponse
        : {
              version: APIVersion,
              self: ""
          };

    if (!result) return response;

    new APIDispatcher(response).dispatch(result);

    return response;
};

interface AddPostProps {
    input: AddPostInput;
    APIResponse?: APIResponse;
    options?: APIOptions;
}

export const AddPost = async ({
    input,
    APIResponse,
    options
}: AddPostProps): Promise<APIResponse> => {
    const id = await generatePostID();
    input.id = id;

    const result = await addPost(input);

    const response = APIResponse
        ? APIResponse
        : {
              version: APIVersion,
              self: ""
          };

    if (!result) return response;

    new APIDispatcher(response).dispatch(result);

    return response;
};

interface GetPostsProps {
    input: GetPostInput;
    APIResponse?: APIResponse;
    options?: APIOptions;
}

export const GetPosts = async ({
    input,
    APIResponse,
    options
}: GetPostsProps): Promise<APIResponse> => {
    const result =
        input.field == "all" ? await getAllPosts(input) : await getPost(input);

    const response = APIResponse
        ? APIResponse
        : {
              version: APIVersion,
              self: ""
          };

    if (!result) return response;

    new APIDispatcher(response).dispatch(options).dispatch(result);

    return response;
};

interface LikeXProps {
    input: LikeXInput;
    APIResponse?: APIResponse;
    options?: APIOptions;
}

export const LikeX = async ({
    input,
    APIResponse,
    options
}: LikeXProps): Promise<APIResponse> => {
    const result = await likeX(input);

    const response = APIResponse
        ? APIResponse
        : {
              version: APIVersion,
              self: ""
          };

    if (!result) return response;

    new APIDispatcher(response).dispatch(result);

    return response;
};
