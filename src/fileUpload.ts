import { S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
import { fromEnv } from "@aws-sdk/credential-providers";
import { parseUrl } from "@smithy/url-parser";
import { Hash } from "@smithy/hash-node";
import { HttpRequest } from "@smithy/protocol-http";
import { formatUrl } from "@aws-sdk/util-format-url";
import { BaseError, PutS3Type, RequestErrorType } from "./types";

const presignedUrl = async (key: string): Promise<string | BaseError> => {
    if (!process.env.AWS_REGION || !process.env.AWS_BUCKET_NAME) {
        return {
            error: RequestErrorType.API_MISSING_ARG,
            details: "Missing environment variables"
        };
    }
    const url = parseUrl(
        `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
    );

    const presigner = new S3RequestPresigner({
        credentials: fromEnv(),
        region: process.env.AWS_REGION,
        sha256: Hash.bind(null, "sha256")
    });

    const signedUrlObject = await presigner.presign(
        new HttpRequest({ ...url, method: "PUT" })
    );

    try {
        return formatUrl(signedUrlObject);
    } catch (error) {
        return {
            error: RequestErrorType.API_REQUEST_FAILED,
            details: String(error)
        };
    }
};

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

const UploadService = { presignedUrl, putS3 };

export default UploadService;
