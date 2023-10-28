import { GetUsers, UpdateUser } from "@/src/db/portal";
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
        const result = await GetUsers(
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
        const { field, value, email } = await request.json();

        const session = await getServerSession();

        if (
            !session ||
            !session.user ||
            !session.user.email ||
            session.user.email != email
        ) {
            baseResponse.error = {
                error: RequestErrorType.API_AUTH_ERROR,
                detail: "Not authorized to modify this value"
            };

            return NextResponse.json(baseResponse, { status: 401 });
        }

        if (!field || !value || !email) {
            return NextResponse.json(
                {
                    error: RequestErrorType.API_MISSING_ARG,
                    details: ""
                },
                { status: 409 }
            );
        }

        if (field == "email") {
            return NextResponse.json(
                {
                    error: RequestErrorType.API_UNSUPPORTED_ACTION,
                    details: "Cant change email address yet"
                },
                { status: 400 }
            );
        }

        const result = await UpdateUser({
            field: field,
            value: value,
            email: email
        });

        if (result.error) {
            return NextResponse.json(result, { status: 409 });
        }

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
