import UploadService from "@/src/services/aws/server/fileUpload";
import { RequestErrorType, isBaseError } from "@/src/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { key } = await request.json();

        if (!key) {
            return NextResponse.json(
                {
                    error: RequestErrorType.API_MISSING_ARG,
                    details: "missing key"
                },
                { status: 409 }
            );
        }

        const result = await UploadService.presignedUrl(key);

        if (isBaseError(result)) {
            return NextResponse.json(result, { status: 409 });
        }

        return NextResponse.json(
            { url: result, cdn: process.env.AWS_CDN, key: key },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: "error.message" }, { status: 500 });
    }
}
