/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  APIDataTypes,
  APIDataTypesName,
  APIMessage,
  APIOptions,
  APIPaginationType,
  APIResponse,
  APIVersion,
  BaseError,
  FollowType,
  LinkAction,
  PostType,
  UserType,
  isAPIMessage,
  isApiOption,
  isBaseError,
  isFollowType,
  isPostType,
  isUserType
} from "@/src/types";

export class APIDispatcher {
  private response: APIResponse;

  constructor(response: APIResponse) {
    this.response = response;
  }

  private overwrite(): boolean {
    return !!this.response.error;
  }

  private addUsers(users: UserType[]) {
    if (this.overwrite()) return;

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

    this.response.data = data;
  }

  private addFollows(follows: FollowType[]) {
    if (this.overwrite()) return;

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

    this.response.data = data;
  }

  private addPosts(posts: PostType[]) {
    if (this.overwrite()) return;

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

    this.response.data = data;
  }

  private addError(error: BaseError) {
    this.response.error = { error: error.error, details: error.details };
  }

  private addPagination(options?: APIOptions) {
    if (this.overwrite()) return;

    if (!options) {
      options = {
        pagination: {
          index: 0,
          limit: 10
        }
      };
    }

    if (!this.response.rel) {
      this.response.rel = {
        pagination: options.pagination as APIPaginationType
      };
    } else {
      this.response.rel.pagination = options.pagination as APIPaginationType;
    }
  }

  private addMessage(message: APIMessage) {
    this.response.message = {
      type: message.type,
      message: message.message,
      content: message.content
    };
  }

  public dispatch<T>(data: BaseError | T | T[]): APIDispatcher {
    if (!APIVersion) this.response.version = `${APIVersion}`;

    if (isBaseError(data)) {
      this.addError(data);
      return this;
    }

    if (isAPIMessage(data)) {
      this.addMessage(data);
      return this;
    }

    if (Array.isArray(data) && isUserType(data[0])) {
      this.addUsers(data as UserType[]);
      return this;
    }

    if (Array.isArray(data) && isFollowType(data[0])) {
      this.addFollows(data as FollowType[]);
      return this;
    }

    if (Array.isArray(data) && isPostType(data[0])) {
      this.addPosts(data as PostType[]);
      return this;
    }

    if (isApiOption(data)) {
      this.addPagination(data);
      return this;
    }

    return this;
  }
}
