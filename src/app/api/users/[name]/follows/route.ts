import { GetFollows, UpdateFollows } from "@/src/db/portal";
import { RequestErrorType, isBaseError } from "@/src/types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
interface RouteContext {
    params: { name: string };
}
export async function GET(request: NextRequest, context: RouteContext) {
    try {
        const name = context.params.name;

        const field = request.nextUrl.searchParams.get("field") as
            | "self"
            | "follow";
        const self = request.nextUrl.searchParams.get("self") as string;

        if (!name || !field) {
            return NextResponse.json(
                {
                    error: RequestErrorType.API_MISSING_ARG,
                    details: "Require name and field"
                },
                { status: 409 }
            );
        }

        if (field != "follow" && field != "self") {
            return NextResponse.json(
                {
                    error: RequestErrorType.API_UNSUPPORTED_ACTION,
                    details: "field should be set to self or follow"
                },
                { status: 401 }
            );
        }

        const result = await GetFollows({
            field: field,
            value: name,
            self: self
        });

        if (isBaseError(result)) {
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
    try {
        const name = context.params.name;
        const action = request.nextUrl.searchParams.get("action") as
            | "follow"
            | "unfollow";
        const session = await getServerSession();

        if (!session || !session.user || !session.user.name) {
            return NextResponse.json(
                {
                    error: RequestErrorType.API_AUTH_ERROR,
                    details: "Need connection"
                },
                { status: 401 }
            );
        }

        if (!name || !action) {
            return NextResponse.json(
                {
                    error: RequestErrorType.API_MISSING_ARG,
                    details: "Require name and action"
                },
                { status: 409 }
            );
        }

        if (action != "follow" && action != "unfollow") {
            return NextResponse.json(
                {
                    error: RequestErrorType.API_UNSUPPORTED_ACTION,
                    details: "action should be set to follow or unfollow"
                },
                { status: 401 }
            );
        }

        console.log(session.user.name);

        const result = await UpdateFollows({
            type: action,
            self: session.user.name,
            follow: name
        });

        if (isBaseError(result)) {
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
