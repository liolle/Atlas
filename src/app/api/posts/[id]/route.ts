import { GetPosts, LikeX } from "@/src/db/portal";
import {
    APIResponse,
    APIVersion,
    LinkActionType,
    RequestErrorType
} from "@/src/types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
interface RouteContext {
    params: { id: string; reference: string };
}

export async function GET(request: NextRequest, context: RouteContext) {
    const session = await getServerSession();

    const baseResponse: APIResponse = {
        self: request.nextUrl.href,
        version: APIVersion
    };

    try {
        const id = context.params.id;

        const result = await GetPosts({
            input: {
                self: session?.user?.name || " ",
                field: "id",
                value: id
            },
            APIResponse: baseResponse
        });

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

export async function POST(request: NextRequest, context: RouteContext) {
    const baseResponse: APIResponse = {
        self: request.nextUrl.href,
        version: APIVersion
    };

    try {
        const action = request.nextUrl.searchParams.get(
            "action"
        ) as LinkActionType;

        const id = context.params.id;

        const session = await getServerSession();

        if (!session || !session.user || !session.user.name) {
            baseResponse.error = {
                error: RequestErrorType.API_AUTH_ERROR,
                detail: "Need to be authenticated to like a post"
            };

            return NextResponse.json(baseResponse, { status: 401 });
        }

        if (!action) {
            baseResponse.error = {
                error: RequestErrorType.API_MISSING_ARG,
                detail: "Need to specify an action"
            };

            return NextResponse.json(baseResponse, { status: 401 });
        }

        if (action == "like") {
            const result = await LikeX({
                input: {
                    id: id,
                    name: session.user.name,
                    type: "posts"
                },
                APIResponse: baseResponse
            });

            if (result.error) {
                return NextResponse.json(result, { status: 409 });
            }

            return NextResponse.json(result, { status: 200 });
        }

        baseResponse.error = {
            error: RequestErrorType.API_UNSUPPORTED_ACTION,
            detail: ""
        };

        return NextResponse.json(baseResponse, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
