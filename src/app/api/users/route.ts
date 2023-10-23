import { GetUsers, UpdateUser } from "@/src/db/portal";
import { RequestErrorType, isBaseError } from "@/src/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { field, email } = await request.json();

        const result = await GetUsers({
            field: field,
            value: email
        });

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "error.message" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { field, value, email } = await request.json();

        if (!field || !value || !email) {
            return NextResponse.json(
                { error: RequestErrorType.API_MISSING_ARG },
                { status: 409 }
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
        console.log(error);

        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
