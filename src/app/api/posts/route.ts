import { AddPost, GetPosts } from "@/src/db/portal";
import { APIResponse, APIVersion, RequestErrorType } from "@/src/types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const session = await getServerSession();

    const baseResponse: APIResponse = {
        self: request.nextUrl.href,
        version: APIVersion
    };

    try {
        const result = await GetPosts(
            {
                self: session?.user?.name || " ",
                field: "all",
                value: ""
            },
            baseResponse
        );

        if (result.error) {
            return NextResponse.json(result, { status: 400 });
        }

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            {
                error: RequestErrorType.API_REQUEST_FAILED,
                details: String(error)
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    const baseResponse: APIResponse = {
        self: request.nextUrl.href,
        version: APIVersion
    };

    try {
        const { content, files } = await request.json();

        const session = await getServerSession();

        if (!session || !session.user || !session.user.name) {
            baseResponse.error = {
                error: RequestErrorType.API_AUTH_ERROR,
                detail: "Need to be authenticated to add a post"
            };

            return NextResponse.json(baseResponse, { status: 401 });
        }

        if (!content) {
            baseResponse.error = {
                error: RequestErrorType.API_MISSING_ARG,
                detail: "Missing content"
            };

            return NextResponse.json(baseResponse, { status: 409 });
        }

        const result = await AddPost({
            id: "",
            owner: session.user.name,
            content: content,
            files: files
        });

        if (result.error) {
            return NextResponse.json(result, { status: 409 });
        }

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
