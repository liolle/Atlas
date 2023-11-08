import { fromEnv } from "@aws-sdk/credential-providers";
import { S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
import { formatUrl } from "@aws-sdk/util-format-url";
import { Hash } from "@smithy/hash-node";
import { HttpRequest } from "@smithy/protocol-http";
import { parseUrl } from "@smithy/url-parser";
import { BaseError, RequestErrorType } from "../../types";

// import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

// const client = new S3Client({});

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

const deleteFile = async () => {};

const UploadServiceServer = { presignedUrl, deleteFile };

export default UploadServiceServer;
