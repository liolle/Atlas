import { GetPosts } from "@/src/db/portal";
import { APIResponse, APIVersion, RequestErrorType } from "@/src/types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
interface RouteContext {
    params: { name: string };
}
export async function GET(request: NextRequest, context: RouteContext) {
    const session = await getServerSession();

    const baseResponse: APIResponse = {
        self: request.nextUrl.href,
        version: APIVersion
    };
    try {
        const name = context.params.name;

        const result = await GetPosts({
            input: {
                self: session?.user?.name || " ",
                field: "owner",
                value: name
            },
            APIResponse: baseResponse,
            options: {
                pagination: {
                    index: 1,
                    limit: 5
                }
            }
        });

        if (result.error) {
            return NextResponse.json(result, { status: 400 });
        }

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        baseResponse.error = {
            error: RequestErrorType.API_REQUEST_FAILED,
            detail: String(error)
        };

        return NextResponse.json(baseResponse, { status: 500 });
    }
}
