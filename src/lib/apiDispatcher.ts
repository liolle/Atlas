/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    APIDataTypes,
    APIDataTypesName,
    APIResponse,
    APIVersion,
    BaseError,
    FollowType,
    LinkAction,
    PostType,
    UserType,
    isBaseError,
    isFollowType,
    isPostType,
    isUserType
} from "../types";

interface optionsProps {
    index?: number;
    limit?: number;
}

const dispatchMethods = {
    addUsers: (
        response: APIResponse,
        users: UserType[],
        options?: optionsProps
    ): APIResponse => {
        if (response.error) return response;

        const content: {
            actions: LinkAction[];
            item: UserType;
        }[] = users.map((row) => {
            return {
                item: row,
                actions: [
                    {
                        type: "followUser",
                        link: `/api/users/${row.name}/follows?action=follow`
                    } as LinkAction,
                    {
                        type: "unfollowUser",
                        link: `/api/users/${row.name}/follows?action=unfollow`
                    } as LinkAction
                ]
            };
        });

        const data: {
            type: APIDataTypesName;
            count: number;
            content: {
                actions: LinkAction[];
                item: APIDataTypes;
            }[];
        } = {
            type: "user",
            count: users.length,
            content: content
        };

        response.data = data;

        return response;
    },
    addFollows: (response: APIResponse, follows: FollowType[]): APIResponse => {
        if (response.error) return response;

        const content: {
            actions: LinkAction[];
            item: FollowType;
        }[] = follows.map((row) => {
            return {
                item: row,
                actions: [
                    {
                        type: "followUser",
                        link: `/api/users/${row.name}/follows?action=follow`
                    } as LinkAction,
                    {
                        type: "unfollowUser",
                        link: `/api/users/${row.name}/follows?action=unfollow`
                    } as LinkAction
                ]
            };
        });

        const data: {
            type: APIDataTypesName;
            count: number;
            content: {
                actions: LinkAction[];
                item: APIDataTypes;
            }[];
        } = {
            type: "follows",
            count: follows.length,
            content: content
        };

        response.data = data;

        return response;
    },
    addPosts: (response: APIResponse, posts: PostType[]): APIResponse => {
        if (response.error) return response;

        const content: {
            actions: LinkAction[];
            item: PostType;
        }[] = posts.map((row) => {
            return {
                item: row,
                actions: [
                    {
                        type: "like",
                        link: `/api/posts/${row.id}?action=like`
                    } as LinkAction
                ]
            };
        });

        const data: {
            type: APIDataTypesName;
            count: number;
            content: {
                actions: LinkAction[];
                item: APIDataTypes;
            }[];
        } = {
            type: "posts",
            count: posts.length,
            content: content
        };
        response.data = data;

        return response;
    },
    addError: (response: APIResponse, error: BaseError): APIResponse => {
        return {
            version: response.version,
            self: response.self,
            error: { error: error.error, detail: error.details }
        };
    }
};

export const APIDispatcher = <T>(
    response: APIResponse,
    data: BaseError | T | T[]
): APIResponse => {
    if (!APIVersion) response.version = `${APIVersion}`;

    if (isBaseError(data)) {
        return dispatchMethods.addError(response, data);
    }

    if (Array.isArray(data) && isUserType(data[0])) {
        return dispatchMethods.addUsers(response, data as UserType[]);
    }

    if (Array.isArray(data) && isFollowType(data[0])) {
        return dispatchMethods.addFollows(response, data as FollowType[]);
    }

    if (Array.isArray(data) && isPostType(data[0])) {
        return dispatchMethods.addPosts(response, data as PostType[]);
    }

    return response;
};
