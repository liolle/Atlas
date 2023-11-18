/* eslint-disable @typescript-eslint/no-unused-vars */
import { APIDispatcher } from "@/src/lib/apiDispatcher";
import { generatePictureID, generatePostID } from "@/src/lib/utils";
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
  UpdateUserInput,
  AddMediaInput,
  BaseError,
  isBaseError,
  SQLInterfaceOptions
} from "@/src/types";
import { UnFollowUsers } from "./sql/follows/delete";
import { getFollow } from "./sql/follows/get";
import { FollowUsers } from "./sql/follows/post";
import { likeX } from "./sql/likes/post";
import { MediaPostLinkInput, addMedia, linkPostMedia } from "./sql/medias/post";
import { getAllPosts, getPost } from "./sql/posts/get";
import { addPost } from "./sql/posts/post";
import { getAllUsers, getUsers } from "./sql/users/get";
import updateUser from "./sql/users/update";

interface GetUsersProps {
  input: GetUserInput;
  APIResponse?: APIResponse;
  options?: {
    mock?: SQLInterfaceOptions;
  };
}

export const GetUsers = async ({
  input,
  APIResponse,
  options
}: GetUsersProps): Promise<APIResponse> => {
  const result =
    input.field == "all"
      ? await getAllUsers({ input: input, options: options })
      : await getUsers({ input: input, options: options });

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
  options?: {
    mock?: SQLInterfaceOptions;
  };
}

export const UpdateUser = async ({
  input,
  APIResponse,
  options
}: UpdateUserProps): Promise<APIResponse> => {
  const result = await updateUser({ input: input, options: options });

  const response = APIResponse
    ? APIResponse
    : {
        version: APIVersion,
        self: ""
      };

  new APIDispatcher(response).dispatch(result);

  return response;
};

interface GetFollowsProps {
  input: GetUserFollowInput;
  APIResponse?: APIResponse;
  options?: {
    mock?: SQLInterfaceOptions;
  };
}

export const GetFollows = async ({
  input,
  APIResponse,
  options
}: GetFollowsProps): Promise<APIResponse> => {
  const result = await getFollow({ input: input, options: options });

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
  options?: {
    mock?: SQLInterfaceOptions;
  };
}

export const UpdateFollows = async ({
  input,
  APIResponse,
  options
}: UpdateFollowsProps): Promise<APIResponse> => {
  const result =
    input.type == "follow"
      ? await FollowUsers({ input: input, options: options })
      : await UnFollowUsers({ input: input, options: options });

  const response = APIResponse
    ? APIResponse
    : {
        version: APIVersion,
        self: ""
      };

  new APIDispatcher(response).dispatch(result);
  return response;
};

interface AddPostProps {
  input: AddPostInput;
  APIResponse?: APIResponse;
  options?: {
    mock?: SQLInterfaceOptions;
  };
}

export const AddPost = async ({
  input,
  APIResponse,
  options
}: AddPostProps): Promise<APIResponse> => {
  const id = await generatePostID();
  input.id = id;

  const result = await addPost({ input: input, options: options });

  const response = APIResponse
    ? APIResponse
    : {
        version: APIVersion,
        self: ""
      };

  new APIDispatcher(response).dispatch(result);

  if (!isBaseError(result)) {
    const medias = await AddFiles({
      input: input.files,
      options: options
    });

    const binds = await BindFilesToPost({
      input: medias.map((value) => {
        return {
          media_id: value.id,
          post_id: id
        };
      })
    });

    if (!binds) return response;
    new APIDispatcher(response).dispatch(binds);
    return response;
  }

  return response;
};

interface GetPostsProps {
  input: GetPostInput;
  APIResponse?: APIResponse;
  options?: {
    mock?: SQLInterfaceOptions;
  };
}

export const GetPosts = async ({
  input,
  APIResponse,
  options
}: GetPostsProps): Promise<APIResponse> => {
  const result =
    input.field == "all"
      ? await getAllPosts({ input: input, options: options })
      : await getPost({ input: input, options: options });

  const response = APIResponse
    ? APIResponse
    : {
        version: APIVersion,
        self: ""
      };

  new APIDispatcher(response).dispatch(result);
  return response;
};

interface LikeXProps {
  input: LikeXInput;
  APIResponse?: APIResponse;
  options?: {
    mock?: SQLInterfaceOptions;
  };
}

export const LikeX = async ({
  input,
  APIResponse,
  options
}: LikeXProps): Promise<APIResponse> => {
  const result = await likeX({ input: input, options: options });

  const response = APIResponse
    ? APIResponse
    : {
        version: APIVersion,
        self: ""
      };

  new APIDispatcher(response).dispatch(result);
  return response;
};

interface AddFilesProps {
  input: string[];
  options?: {
    mock?: SQLInterfaceOptions;
  };
}
const AddFiles = async ({
  input,
  options
}: AddFilesProps): Promise<AddMediaInput[]> => {
  const info: AddMediaInput[] = [];

  for (const link of input) {
    const id = await generatePictureID();
    info.push({ id: id, link: link });
  }

  const result = await addMedia(info);

  if (isBaseError(result)) {
    return [];
  }

  return info;
};

interface BindFilesToPostProps {
  input: MediaPostLinkInput[];
  options?: {
    mock?: SQLInterfaceOptions;
  };
}

const BindFilesToPost = async ({
  input,
  options
}: BindFilesToPostProps): Promise<null | BaseError> => {
  const result = await linkPostMedia(input);
  return result;
};
