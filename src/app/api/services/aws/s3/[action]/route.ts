import UploadServiceServer from "@/src/services/aws/server/fileUpload";
import { APIResponse, APIVersion } from "@/src/types";
import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
    params: { action: "objdelete" };
}

export async function POST(request: NextRequest, context: RouteContext) {
    const baseResponse: APIResponse = {
        self: request.nextUrl.href,
        version: APIVersion
    };

    const key = request.nextUrl.searchParams.get("key");

    if (context.params.action == "objdelete") {
        if (!key) return NextResponse.json(baseResponse, { status: 400 });

        await UploadServiceServer.deleteFile(key);
        return NextResponse.json(baseResponse, { status: 200 });
    }

    return NextResponse.json(baseResponse, { status: 200 });
}
