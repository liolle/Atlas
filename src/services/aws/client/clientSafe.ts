import { BaseError, PutS3Type, RequestErrorType } from "@/src/types";

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

const UploadServiceClient = { putS3 };

export default UploadServiceClient;
