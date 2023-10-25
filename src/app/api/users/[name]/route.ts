import { GetUsers } from "@/src/db/portal";
import { RequestErrorType, isBaseError } from "@/src/types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
    params: { name: string };
}

export async function GET(request: NextRequest, context: RouteContext) {
    const session = await getServerSession();
    try {
        const name = context.params.name;

        if (!name) {
            return NextResponse.json(
                {
                    error: RequestErrorType.API_MISSING_ARG,
                    details: "Missing name"
                },
                { status: 409 }
            );
        }

        const result = await GetUsers({
            self: session?.user?.name || " ",
            field: "name",
            value: name
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
