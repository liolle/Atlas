import { generatePictureID } from "@/src/lib/utils";
import {
  BaseError,
  PutS3Type,
  RequestErrorType,
  isBaseError
} from "@/src/types";

const putS3 = async ({ url, data }: PutS3Type): Promise<string | BaseError> => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": data.type
      },
      body: data
    });

    if (!response.ok) {
      throw new Error("PUT request failed");
    }

    return "ok";
  } catch (error) {
    return {
      error: RequestErrorType.API_REQUEST_FAILED,
      details: String(error)
    };
  }
};

type GetPresignedUrlInput = {
  key: string;
};

type GetPresignedUrlOutput = {
  url: string;
  cdn: string;
  key: string;
};

const getPresignedUrl = async ({
  key
}: GetPresignedUrlInput): Promise<GetPresignedUrlOutput | BaseError> => {
  try {
    const response = await fetch("/api/services/aws/s3/presignedUrl", {
      method: "POST",
      body: JSON.stringify({
        key: key
      })
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return {
      error: RequestErrorType.API_REQUEST_FAILED,
      details: String(error)
    };
  }
};

interface PushFilesCtx {
  files: File[];
  ctx: {
    origin: "posts";
  };
}

const pushFiles = async ({
  files,
  ctx
}: PushFilesCtx): Promise<string[] | BaseError> => {
  try {
    const fileId = await generatePictureID();
    const preSign = await Promise.all(
      files.map(async (item, idx) => {
        let key = `${ctx.origin}/${fileId}/`;
        key += `file${idx + 1}`;
        key += `.${item.name.split(".").pop()}`;
        const result = await getPresignedUrl({ key });
        return {
          info: result,
          file: item
        };
      })
    );

    const put = await Promise.all(
      preSign
        .filter((value) => !isBaseError(value.info))
        .map(async (item) => {
          const info = item.info as GetPresignedUrlOutput;
          await putS3({
            url: info.url,
            data: item.file
          });
          return `https://${info.cdn}/${info.key}`;
        })
    );

    const res = put.filter((value): value is string => !isBaseError(value));

    return res;
  } catch (error) {
    return {
      error: RequestErrorType.API_REQUEST_FAILED,
      details: String(error)
    };
  }
};

const UploadServiceClient = { putS3, getPresignedUrl, pushFiles };

export default UploadServiceClient;
