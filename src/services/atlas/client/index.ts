"use client";
import { generatePictureID } from "@/src/lib/utils";
import { BaseError, RequestErrorType, isBaseError } from "@/src/types";
import UploadServiceClient from "@/src/services/aws/client";
import { Session } from "next-auth";

interface ClientChangeProfilePictureInput {
  file: File;
  session: Session | null;
}

const changeProfilePicture = async ({
  file,
  session
}: ClientChangeProfilePictureInput): Promise<string | BaseError> => {
  if (!session) {
    return {
      error: RequestErrorType.API_AUTH_ERROR,
      details: "Incorrect session data"
    };
  }

  const extension = file.name.split(".").pop();

  try {
    const generated_key = await generatePictureID();
    const data = await UploadServiceClient.getPresignedUrl({
      key: `${generated_key}.${extension}`
    });

    if (isBaseError(data)) return data;

    await UploadServiceClient.putS3({
      url: data.url,
      data: file
    });
    const result = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        field: "image",
        value: `https://${data.cdn}/${data.key}`,
        email: session?.user?.email
      })
    });
    if (!result.ok) {
      return {
        error: RequestErrorType.API_REQUEST_FAILED,
        details: ""
      };
    }
    const oldKey = session?.user?.image;

    if (oldKey) {
      const key = oldKey.split("/").pop();

      if (key) {
        await fetch(`/api/services/aws/s3/objdelete?key=${key}`, {
          method: "POST"
        });
      }
    }

    return `https://${data.cdn}/${data.key}`;
  } catch (error) {
    console.log(error);

    return {
      error: RequestErrorType.API_REQUEST_FAILED,
      details: String(error)
    };
  }
};

interface ClientAddPostInput {
  input: {
    content: string;
    reference?: string;
    files: string[];
  };
}

const addPost = async ({
  input
}: ClientAddPostInput): Promise<null | BaseError> => {
  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        content: input.content,
        reference: input.reference,
        files: input.files
      })
    });

    if (!response.ok) {
      return {
        error: RequestErrorType.API_REQUEST_FAILED,
        details: ""
      };
    }

    return null;
  } catch (error) {
    console.log(error);

    return {
      error: RequestErrorType.API_REQUEST_FAILED,
      details: String(error)
    };
  }
};

interface likePostInput {
  id: string;
}
const likePost = async ({ id }: likePostInput): Promise<BaseError | null> => {
  const response = await fetch(`/api/posts/${id}?action=like`, {
    method: "POST"
  });

  if (!response.ok) {
    const result = await response.json();

    if (result.error) {
      return {
        error: RequestErrorType.API_REQUEST_FAILED,
        details: ""
      };
    }
  }
  return null;
};

const AtlasClient = { changeProfilePicture, addPost, likePost };

export default AtlasClient;
