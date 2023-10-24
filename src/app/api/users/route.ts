import { GetUsers, UpdateUser } from "@/src/db/portal";
import { RequestErrorType, isBaseError } from "@/src/types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await GetUsers({
            field: "all",
            value: ""
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

export async function POST(request: NextRequest) {
    try {
        const { field, value, email } = await request.json();

        const session = await getServerSession();

        if (
            !session ||
            !session.user ||
            !session.user.email ||
            session.user.email != email
        ) {
            return NextResponse.json(
                {
                    error: RequestErrorType.API_AUTH_ERROR,
                    details: "Not authorized to modify this value"
                },
                { status: 401 }
            );
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

        if (isBaseError(result)) {
            return NextResponse.json(result, { status: 409 });
        }

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
